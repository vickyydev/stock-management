import React from 'react';
import { Card } from 'antd';
import AddStock from '../components/Stocks/AddStock';

const AddStockPage: React.FC = () => {
  return (
    <div
      style={{
        padding: '24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
      }}
    >
      <Card
        style={{
          width: '100%',
          maxWidth: '600px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
          padding: '24px',
        }}
      >
        <h1 style={{ textAlign: 'left', marginBottom: '24px' }}></h1>
        <AddStock />
      </Card>
    </div>
  );
};

export default AddStockPage;
