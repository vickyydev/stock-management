import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Spin, notification } from 'antd';
import { useParams } from 'react-router-dom';
import stockStore from '../../stores/stockStore';
import { observer } from 'mobx-react-lite';
import './AddStock.css'; // Import CSS

const AddStock: React.FC = observer(() => {
  const { id } = useParams<{ id: string }>();  // Get stock ID from URL params for edit
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();  // AntD form instance

  useEffect(() => {
    if (id) {
      // If there's an id, fetch the stock details and set them in the form
      setLoading(true);
      stockStore.fetchStockById(id).then(() => {
        if (stockStore.selectedStock) {
          form.setFieldsValue(stockStore.selectedStock);  // Pre-fill form for editing
        }
        setLoading(false);
      });
    }
  }, [id, form]);

  const onFinish = async (values: any) => {
    const formattedValues = {
      ...values,
      quantity: Number(values.quantity),
      purchasePrice: Number(values.purchasePrice),
    };

    setLoading(true);
    try {
      if (id) {
        // If editing, update the stock
        await stockStore.updateStock(id, formattedValues);
        notification.success({
          message: 'Stock Updated',
          description: `${values.name} has been successfully updated.`,
        });
      } else {
        // If adding, create a new stock
        await stockStore.createStock(formattedValues);
        notification.success({
          message: 'Stock Added',
          description: `${values.name} has been successfully added to your portfolio.`,
        });
      }
    } catch (error) {
      notification.error({
        message: id ? 'Failed to Update Stock' : 'Failed to Add Stock',
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} name="add-stock" onFinish={onFinish} layout="vertical">
      <h2>{id ? 'Edit Stock' : 'Add new Stock'}</h2>  {/* Change title based on operation */}
      <Form.Item
        label="Stock Symbol"
        name="symbol"
        rules={[{ required: true, message: 'Please input the stock symbol!' }]}
      >
        <Input
          placeholder="AAL, GOOGL, etc."
          disabled={!!id}  // Disable symbol input on edit for UI, but allow form validation
        />
      </Form.Item>

      <Form.Item
        label="Stock Name"
        name="name"
        rules={[{ required: true, message: 'Please input the stock name!' }]}
      >
        <Input placeholder="Apple Inc., Google LLC, etc." />
      </Form.Item>

      <Form.Item
        label="Quantity"
        name="quantity"
        rules={[{ required: true, message: 'Please input the quantity!' }]}
      >
        <Input type="number" placeholder="100, 50, etc." />
      </Form.Item>

      <Form.Item
        label="Purchase Price"
        name="purchasePrice"
        rules={[{ required: true, message: 'Please input the purchase price!' }]}
      >
        <Input type="number" placeholder="Enter the price you purchased at" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block disabled={loading}>
          {loading ? <Spin /> : id ? 'Save Changes' : 'Add Stock'}
        </Button>
      </Form.Item>
    </Form>
  );
});

export default AddStock;
