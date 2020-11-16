import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { PageHeader, Typography, Button, Avatar, Menu, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './nav-bar.less';
const { Paragraph } = Typography;

const NavBar: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname;

  const isLoggedIn = () => {
    return !(path === '/' || path === '/login' || path === 'signup');
  };

  const BackIcon = () => {
    const Logo: string = require('../../nav-bar-icon.png');
    return <img className='back-icon' src={Logo} alt='icon' />;
  };

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          history.push('/settings');
        }}
      >
        Account Settings
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          history.push('/');
        }}
      >
        Log Out
      </Menu.Item>
    </Menu>
  );

  const LandingExtra = () => {
    return (
      <div className='landing-extra'>
        <Button
          type='primary'
          htmlType='submit'
          size={'large'}
          style={{ backgroundColor: '#9AC356', borderColor: '#9AC356' }}
          onClick={() => history.push('/signup')}
        >
          Sign Up
        </Button>
        <Button
          type='primary'
          htmlType='submit'
          size={'large'}
          style={{
            backgroundColor: '#fff',
            borderColor: '#fff',
            color: 'black',
          }}
          onClick={() => history.push('/login')}
        >
          Log In
        </Button>
      </div>
    );
  };

  const LoggedInExtra = () => {
    return (
      <div className='logged-in-extra'>
        <Paragraph>Jack Blanc</Paragraph>
        <Dropdown overlay={menu} placement='bottomLeft'>
          <Avatar
            size='large'
            icon={<UserOutlined />}
            style={{ backgroundColor: '#3A681A' }}
          />
        </Dropdown>
      </div>
    );
  };

  return (
    <PageHeader
      className='page-header'
      title='Speak for the Trees'
      backIcon={<BackIcon />}
      onBack={() => history.push('/')}
      extra={isLoggedIn() ? <LoggedInExtra /> : <LandingExtra />}
    ></PageHeader>
  );
};

export default NavBar;
