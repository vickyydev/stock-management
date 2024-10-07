import React from 'react';
import { Layout, Menu, Avatar, Dropdown, Button, Tooltip } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import './NavBar.css'; // Ensure your CSS file path is correct
import authStore from '../../stores/authStore';
import { observer } from 'mobx-react-lite';

const { Header } = Layout;

const NavBar: React.FC = observer(() => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authStore.logout();
    navigate('/login');
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="navbar">
      <div className="navbar-logo">
        <Link to="/">Stock Management</Link>
      </div>

      <Menu theme="dark" mode="horizontal" className="navbar-menu">
        <Menu.Item key="portfolio">
          <Link to="/portfolio">Portfolio</Link>
        </Menu.Item>
        <Menu.Item key="add-stock">
          <Link to="/create-stock">Add Stock</Link>
        </Menu.Item>
      </Menu>

      <div className="navbar-user">
        {authStore.username ? (
          <Tooltip title={`Logged in as ${authStore.username}`}>
            <Dropdown overlay={userMenu} placement="bottomRight" trigger={['click']}>
              <Avatar
                style={{ backgroundColor: '#87d068', cursor: 'pointer' }}
                icon={<UserOutlined />}
              />
            </Dropdown>
          </Tooltip>
        ) : (
          <Button type="primary" onClick={() => navigate('/login')}>
            Login
          </Button>
        )}
      </div>
    </Header>
  );
});

export default NavBar;
