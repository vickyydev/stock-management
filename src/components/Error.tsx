import React from 'react';
import { Button, Typography, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import './Error.css';

const { Title, Text } = Typography;

const Error: React.FC = () => {
  return (
    <div className="error-wrapper">
      <Row justify="center" align="middle" className="error-container">
        <Col xs={24} md={16} lg={12}>
          <div className="error-content">
            <Title level={1} className="error-title">404</Title>
            <Title level={3} className="error-subtitle">Oops! Page Not Found</Title>
            <Text type="secondary" className="error-description">
              Sorry, the page you’re looking for doesn’t exist or has been moved.
            </Text>
            <Row justify="center" className="error-button-row">
              <Col>
                <Link to="/">
                  <Button type="primary" size="large" className="error-button">
                    Go to Home
                  </Button>
                </Link>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Error;
