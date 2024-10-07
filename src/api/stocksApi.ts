import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getStocks = () => {
  return axios.get(`${BASE_URL}/stocks`, {
    headers: getAuthHeaders(),
  });
};

export const getStockQuote = async (symbol: string) => {
  return await axios.get(`${BASE_URL}/stocks/quote/${symbol}` , 
    {
      headers: getAuthHeaders(),
    }
    
  );
};

export const getStockById = (id: string) => {
  return axios.get(`${BASE_URL}/stocks/${id}`, {
    headers: getAuthHeaders(),
  });
};

export const createStock = (stockData: {
  symbol: string;
  name: string;
  quantity: number;
  purchasePrice: number;
}) => {
  return axios.post(`${BASE_URL}/stocks`, stockData, {
    headers: getAuthHeaders(),
  });
};

export const updateStock = (
  id: string,
  stockData: {
    name?: string;
    quantity?: number;
    purchasePrice?: number;
    currentPrice?: number;
  }
) => {
  return axios.put(`${BASE_URL}/stocks/${id}`, stockData, {
    headers: getAuthHeaders(),
  });
};

export const deleteStock = (id: string) => {
  return axios.delete(`${BASE_URL}/stocks/${id}`, {
    headers: getAuthHeaders(),
  });
};
