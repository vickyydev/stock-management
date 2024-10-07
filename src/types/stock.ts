export interface Stock {
    _id: string;
    symbol: string;
    name: string;
    quantity: number;
    purchasePrice: number;
    currentPrice: number;
    lastUpdated: Date;
  }
