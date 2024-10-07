import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Table, Card, Statistic, Row, Col, Button, Spin, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import stockStore from '../../stores/stockStore';
import { toJS } from 'mobx';
import { Stock } from '../../types/stock';
import './Portfolio.css';

import { Pie } from '@ant-design/plots';

const Portfolio: React.FC = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    stockStore.fetchStocks().catch(() => {
      message.error('Failed to load portfolio data.');
    });
  }, []);

  const stocks = toJS(stockStore.stocks);

  if (stockStore.loading) {
    return <Spin size="large" style={{ display: 'flex', justifyContent: 'center', marginTop: '20%' }} />;
  }

  const totalPortfolioValue = stocks.reduce((total, stock) => total + (stock.quantity * stock.currentPrice || 0), 0);
  const totalStocks = stocks.length;

  const chartData = stocks.map(stock => ({
    type: stock.symbol,
    value: stock.quantity * stock.currentPrice,
  }));

  const config = {
    appendPadding: 10,
    data: chartData,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    interactions: [{ type: 'element-active' }],
  };

  const columns = [
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Purchase Price',
      dataIndex: 'purchasePrice',
      key: 'purchasePrice',
      render: (text: number) => `$${text?.toFixed(2)}`,
    },
    {
      title: 'Current Price',
      dataIndex: 'currentPrice',
      key: 'currentPrice',
      render: (text: number) => `$${text?.toFixed(2)}`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Stock) => (
        <Button type="link" onClick={() => navigate(`/stock/${record._id}`)}>
          View Details
        </Button>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Stock) => (
        <>
          <Button type="link" onClick={() => navigate(`/edit-stock/${record._id}`)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => stockStore.deleteStock(record._id)}>
            Delete
          </Button>
        </>
      ),
    }
  ];

  return (
    <div className="portfolio-page">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Card title="Stock Distribution">
            <Pie {...config} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Card>
            <Statistic title="Total Portfolio Value" value={`$${totalPortfolioValue?.toFixed(2)}`} />
            <Statistic title="Total Stocks" value={totalStocks} style={{ marginTop: 16 }} />
          </Card>
        </Col>

        <Col xs={24}>
          <Table dataSource={stocks} columns={columns} rowKey="_id" />
        </Col>

        <Col xs={24} style={{ textAlign: 'right' }}>
          <Button type="primary" onClick={() => navigate('/create-stock')}>
            Add New Stock
          </Button>
        </Col>
      </Row>

    </div>
  );
});

export default Portfolio;
