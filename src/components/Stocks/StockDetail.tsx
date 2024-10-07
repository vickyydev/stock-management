import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import stockStore from '../../stores/stockStore';
import { useNavigate } from 'react-router-dom';
import { Card, Spin, Row, Col, Button, Statistic, Divider, Descriptions, Typography } from 'antd';
import './StockDetail.css';

const { Title } = Typography;

interface StockDetailProps {
  stockId: string;
}

const StockDetail: React.FC<StockDetailProps> = observer(({ stockId }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (stockId) {
      stockStore.fetchStockById(stockId); // Fetch stock details by ID
    }
  }, [stockId]);

  useEffect(() => {
    if (stockStore.selectedStock?.symbol) {
      stockStore.fetchLatestStockQuote(stockStore.selectedStock.symbol); // Fetch the latest stock quote if symbol exists
    }
  }, []);

  if (stockStore.loading || !stockStore.selectedStock) {
    return <Spin size="large" style={{ display: 'flex', justifyContent: 'center', marginTop: '20%' }} />;
  }

  const stock = stockStore.selectedStock;
  const latestQuote = stockStore.latestQuote?.data; // Get latest quote data
  const purchasePrice = stock.purchasePrice ? stock.purchasePrice.toFixed(2) : 'N/A';
  const currentPrice = stock.currentPrice ? stock.currentPrice.toFixed(2) : 'N/A';
  const currentValue = stock.quantity && stock.currentPrice ? (stock.quantity * stock.currentPrice).toFixed(2) : 'N/A';
  const totalInvestment = stock.quantity && stock.purchasePrice ? (stock.quantity * stock.purchasePrice).toFixed(2) : 'N/A';
  const profitOrLoss = stock.quantity && stock.currentPrice && stock.purchasePrice
    ? ((stock.currentPrice - stock.purchasePrice) * stock.quantity).toFixed(2)
    : 'N/A';

  // Map the latest stock quote correctly
  const latestPrice = latestQuote?.['05. price'] || 'N/A';
  const highPrice = latestQuote?.['03. high'] || 'N/A';
  const lowPrice = latestQuote?.['04. low'] || 'N/A';
  const volume = latestQuote?.['06. volume'] || 'N/A';

  return (
    <div className="stock-detail-page">
      <Button type="default" onClick={() => navigate('/portfolio')} className="back-button">
        Back to Portfolio
      </Button>

      <Card className="stock-card">
        <Row gutter={[16, 16]} align="middle">
          <Col span={12}>
            <Title level={2}>{stock.name}</Title>
            <Descriptions bordered column={1} size="middle">
              <Descriptions.Item label="Symbol">{stock.symbol}</Descriptions.Item>
              <Descriptions.Item label="Quantity">{stock.quantity}</Descriptions.Item>
              <Descriptions.Item label="Purchase Price">${purchasePrice}</Descriptions.Item>
              <Descriptions.Item label="Current Price">${currentPrice}</Descriptions.Item>
              <Descriptions.Item label="Last Updated">
                {new Date(stock.lastUpdated).toLocaleString()}
              </Descriptions.Item>
            </Descriptions>
          </Col>

          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="Current Value"
                value={currentValue}
                precision={2}
                prefix="$"
                style={{ marginBottom: '24px' }}
              />
              <Divider />
              <Statistic
                title="Total Investment"
                value={totalInvestment}
                precision={2}
                prefix="$"
              />
              <Divider />
              <Statistic
                title="Profit / Loss"
                value={profitOrLoss}
                precision={2}
                prefix="$"
                valueStyle={{ color: stock.currentPrice >= stock.purchasePrice ? 'green' : 'red' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Latest Stock Quote Section */}
        {latestQuote && (
          <Card className="quote-card" style={{ marginTop: '20px' }}>
            <Title level={3}>Latest Stock Quote</Title>
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Statistic title="Latest Price" value={`$${latestPrice}`} precision={2} />
              </Col>
              <Col span={6}>
                <Statistic title="High" value={`$${highPrice}`} precision={2} />
              </Col>
              <Col span={6}>
                <Statistic title="Low" value={`$${lowPrice}`} precision={2} />
              </Col>
              <Col span={6}>
                <Statistic title="Volume" value={volume} />
              </Col>
            </Row>
          </Card>
        )}

        <Row justify="end" style={{ marginTop: '20px' }}>
          <Button type="primary" onClick={() => navigate('/portfolio')}>
            Back to Portfolio
          </Button>
        </Row>
      </Card>
    </div>
  );
});

export default StockDetail;
