import React from 'react';
import { useParams } from 'react-router-dom';
import StockDetail from '../components/Stocks/StockDetail';

const StockPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      {id && <StockDetail stockId={id} />} 
    </div>
  );
};

export default StockPage;
