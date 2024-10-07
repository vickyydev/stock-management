import { makeAutoObservable, runInAction, toJS } from "mobx";
import {
    createStock,
    getStocks,
    getStockQuote,
    getStockById,
    updateStock,
    deleteStock,
} from "../api/stocksApi";
import { Stock } from "../types/stock";

class StockStore {
    stocks: Stock[] = [];
    selectedStock: Stock | null = null;
    loading = false;
    error: string | null = null;
    latestQuote: any = null;

    constructor() {
        makeAutoObservable(this);
    }

    async createStock(stockData: {
        symbol: string;
        name: string;
        quantity: number;
        purchasePrice: number;
    }) {
        try {
            const response = await createStock(stockData);
            runInAction(() => {
                this.stocks.push(response.data);
            });
        } catch (error) {
            console.error("Failed to create stock", error);
        }
    }

    async fetchStocks() {
        this.loading = true;
        this.error = null;
        try {
            const response = await getStocks();
            runInAction(() => {
                this.stocks = Array.isArray(response.data.data) ? response.data.data : [];
                this.loading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.error = error instanceof Error ? error.message : "An unknown error occurred";
                this.loading = false;
            });
            console.error("Failed to fetch stocks", error);
        }
    }

    async fetchLatestStockQuote(symbol: string) {
        this.loading = true;
        try {
            const response = await getStockQuote(symbol);
            runInAction(() => {
                this.latestQuote = response.data;
                this.loading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.error = "Failed to fetch the latest stock quote";
                this.loading = false;
            });
            console.error("Failed to fetch latest quote", error);
        }
    }

    async fetchStockById(id: string) {
        this.loading = true;
        try {
            const response = await getStockById(id);
            runInAction(() => {
                this.selectedStock = response.data.data;
                this.loading = false;
            });
        } catch (error) {
            console.error("Failed to fetch stock", error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    async updateStock(id: string, stockData: {
        name: string;
        quantity: number;
        purchasePrice: number;
    }) {
        try {
            const response = await updateStock(id, stockData);
            runInAction(() => {
                this.stocks = this.stocks.map((stock) =>
                    stock._id === id ? { ...stock, ...response.data } : stock
                );
            });
        } catch (error) {
            console.error("Failed to update stock", error);
        }
    }

    async deleteStock(id: string) {
        try {
            await deleteStock(id);
            runInAction(() => {
                this.stocks = this.stocks.filter((stock) => stock._id !== id);
            });
        } catch (error) {
            console.error("Failed to delete stock", error);
        }
    }
}

const stockStore = new StockStore();
export default stockStore;
