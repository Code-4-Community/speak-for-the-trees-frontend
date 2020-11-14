import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
const { Header } = Layout;

const NavBar: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const path: string = location.pathname;

  function pathnameToKey(pathname: string) {
    switch (pathname) {
      case '/':
        return '1';
      case '/block-template':
        return '2';
      case '/grid-template':
        return '3';
      case '/login':
        return '4';
      case '/signup':
        return '5';
      default:
        return '1';
    }
  }

  return (
    <Header>
      <Menu mode="horizontal" defaultSelectedKeys={[pathnameToKey(path)]}>
        <Menu.Item
          key="1"
          onClick={() => {
            history.push('/');
          }}
        >
          Home
        </Menu.Item>
        <Menu.Item
          key="2"
          onClick={() => {
            history.push('/block-template');
          }}
        >
          Block Template
        </Menu.Item>
        <Menu.Item
          key="3"
          onClick={() => {
            history.push('/grid-template');
          }}
        >
          Grid Template
        </Menu.Item>
        <Menu.Item
          key="4"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </Menu.Item>
        <Menu.Item
          key="5"
          onClick={() => {
            history.push('/signup');
          }}
        >
          Sign Up
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default NavBar;
