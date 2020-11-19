import React, { useState } from 'react';
import { LinkButton } from '../../components/LinkButton';
import { Menu, Dropdown, Row, Col, Button } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const NavRow = styled(Row)`
  background-color: white;
  padding: 1em 0;
`;
const AntButtonLink = styled(LinkButton)`
  color: black;
  margin-left: 7em;
`;

const UserDropdown = styled(Button)`
  float: right;
  margin-right: 3em;
`;

const LoginSignupButtons = styled.div`
  float: right;
  margin-right: 3em;
`;

const SignupButton = styled(Button)`
  margin-left: 1em;
`;

const NavBar: React.FC = () => {
  const [authenticated] = useState(false);

  const userMenu = (
    <Menu>
      <Menu.Item>Change Primary Account Email</Menu.Item>
      <Menu.Item>Account Details</Menu.Item>
      <Menu.Item>Change Password</Menu.Item>
      <Menu.Item>Deactivate Account</Menu.Item>
    </Menu>
  );

  return (
    <NavRow align="middle">
      <Col flex={3}>
        <AntButtonLink to="/">Home</AntButtonLink>
        <AntButtonLink to="/block-template">Block Template</AntButtonLink>
        <AntButtonLink to="/grid-template">Grid Template</AntButtonLink>
      </Col>

      <div>
        {authenticated ? (
          <Col flex={3}>
            <Dropdown overlay={userMenu}>
              <UserDropdown>
                <UserOutlined /> John Smith <DownOutlined />
              </UserDropdown>
            </Dropdown>
          </Col>
        ) : (
          <Col flex={3}>
            <LoginSignupButtons>
              <LinkButton to="/login" component={Button}>
                Login
              </LinkButton>
              <LinkButton to="/signup" component={SignupButton} type="primary">
                Signup
              </LinkButton>
            </LoginSignupButtons>
          </Col>
        )}
      </div>
    </NavRow>
  );
};

export default NavBar;
