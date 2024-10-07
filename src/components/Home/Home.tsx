import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import stockStore from '../../stores/stockStore';
import { Typography, Row, Col, Card, Statistic, Divider, Button, Spin } from 'antd';
import { Pie } from '@ant-design/plots';
import { toJS } from 'mobx';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const { Title, Paragraph } = Typography;

const Home: React.FC = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    stockStore.fetchStocks();
  }, []);

  const stocks = toJS(stockStore.stocks);

  if (stockStore.loading) {
    return <Spin size="large" />;
  }

  const totalPortfolioValue = Array.isArray(stocks)
    ? stocks.reduce(
      (total, stock) => total + (stock.quantity * stock.currentPrice || 0),
      0
    )
    : 0;

  const totalStocks = Array.isArray(stocks) ? stocks.length : 0;

  const chartData = Array.isArray(stocks)
    ? stocks.map((stock) => ({
      type: stock.symbol,
      value: stock.quantity * stock.currentPrice || 0,
    }))
    : [];

  const config = {
    appendPadding: 10,
    data: chartData,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    interactions: [{ type: 'element-active' }],
  };

  return (
    <div className="home-page">
      <Title level={2}>Welcome, {localStorage.getItem('username')}</Title>
      <Paragraph>Manage your stock portfolio with ease.</Paragraph>

      <Row gutter={[16, 16]}>`

        {/* Pie Chart for Stock Distribution */}
        <Col span={13}>
          <Card title="Portfolio Distribution">
            {chartData.length > 0 ? (
              <Pie {...config} />
            ) : (
              <p>No stocks to display in the portfolio.</p>
            )}
          </Card>
        </Col>

        {/* Quick Actions */}
        <Col span={10}>
          <Card>
            <Statistic
              title="Total Portfolio Value"
              value={totalPortfolioValue.toFixed(2)}
              prefix="$"
            />
            <Divider />
            <Statistic
              title="Total Stocks"
              value={totalStocks}
            />
          </Card>
          <Card
            style={{ marginTop: '10px' }}>
            <Button type="primary" block onClick={() => navigate('/portfolio')}>
              View Portfolio
            </Button>
            <Button
              type="default"
              block
              style={{ marginTop: '10px' }}
              onClick={() => navigate('/create-stock')}
            >
              Add New Stock
            </Button>
          </Card>
        </Col>

      </Row>

      <Divider />

      {/* Placeholder for Stock Market News or Insights */}
      <Row>
        <Col span={23}>
          <Card title="Market News">
            <p>Coming soon: Latest stock market news and insights.</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
});

export default Home;
