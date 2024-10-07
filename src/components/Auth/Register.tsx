import React from 'react';
import { Form, Input, Button, Typography, Row, Col, Space, Divider, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import authStore from '../../stores/authStore';
import { observer } from 'mobx-react-lite';

const { Title, Text, Link } = Typography;

const Register: React.FC = observer(() => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: { username: string; password: string }) => {
    const successMessage = await authStore.register(values.username, values.password);
    if (successMessage) {
      messageApi.success(successMessage);
      navigate("/login"); // Redirect to login after successful registration
    } else if (authStore.error) {
      messageApi.error(authStore.error);
    }
  };

  return (
    <Row justify="center" align="middle" className="register-container">
      {contextHolder}
      <Col xs={24} sm={16} md={12} lg={8} xl={6}>
        <div className="register-card">
          <Space direction="vertical" size="large" align="center" style={{ width: '100%' }}>
            <Title level={3} style={{ color: '#1890ff', marginBottom: '0.5rem' }}>Create Your Account</Title>
            <Text type="secondary" style={{ marginBottom: '1rem' }}>Register to access your stock management dashboard</Text>
            <Divider />
            <Form form={form} onFinish={onFinish} className="register-form" layout="vertical">
              <Form.Item name="username" rules={[{ required: true, message: 'Please enter a username!' }]}>
                <Input prefix={<UserOutlined />} placeholder="Username" size="large" />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: 'Please enter a password!' }]}>
                <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" size="large" block loading={authStore.loading}>
                  Register
                </Button>
              </Form.Item>
              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <Text>Already have an account?</Text>{' '}
                <Link onClick={() => navigate('/login')}>Login here</Link>
              </div>
            </Form>
          </Space>
        </div>
      </Col>
    </Row>
  );
});

export default Register;
