import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { PageHeader, Button, Menu, Dropdown } from 'antd';
import { PageHeaderProps } from 'antd/es/page-header';
import { MenuOutlined } from '@ant-design/icons';
import { MID_GREEN, DARK_GREY, BACKGROUND_GREY, WHITE } from '../../colors';

interface MobileNavBarProps {
  readonly isLoggedIn: boolean;
}

const MobileDropdownMenu = styled(MenuOutlined)`
  display: inline-flex;
  font-size: 25px;
`;

const MobileNavHeader: typeof PageHeader = styled(PageHeader)<PageHeaderProps>`
  box-shadow: '0 4px 2px -2px grey';
  width: 100%;
  margin: '0 0 3px 0';
  padding-top: 35px;
  background: ${BACKGROUND_GREY};
  color: ${MID_GREEN};
  font-weight: 700;
`;

const FlexDiv = styled.div`
  display: flex;
`;

const LogoutButton = styled(Button)`
  padding: -5px auto;
  background: ${MID_GREEN};
  color: ${WHITE};
  font-size: 12px;
`;

const RightMenu = styled(Menu)`
  padding: 15px 5px 10px 10px;
  text-align: right;
`;

const GreyItem = styled(Menu.Item)`
  color: ${DARK_GREY};
`;

const MobileNavBar: React.FC<MobileNavBarProps> = ({isLoggedIn}) => {
  const history = useHistory();

  const BackIcon = () => {
    const Logo: string = require('../../nav-bar-icon.png');
    return (
      <img
        className="back-icon"
        src={Logo}
        alt="icon"
        style={{
          height: '30px',
        }}
      />
    );
  };

  const mobileMenu = (
    <RightMenu>
      <GreyItem
        onClick={() => {
          history.push('/settings');
        }}
      >
        Account Settings
      </GreyItem>
      <Menu.Item>
        <LogoutButton
          type="primary"
          size="large"
          onClick={() => {
            history.push('/');
          }}
        >
          Log Out
        </LogoutButton>
      </Menu.Item>
    </RightMenu>
  );

  const MobileLoggedInExtra = () => {
    return (
      <FlexDiv>
        <Dropdown overlay={mobileMenu} placement="bottomLeft">
          <MobileDropdownMenu />
        </Dropdown>
      </FlexDiv>
    );
  };

  return (
    <MobileNavHeader
      className="page-header"
      title=""
      subTitle="Speak for the Trees"
      backIcon={<BackIcon />}
      onBack={() => history.push('/')}
      extra={isLoggedIn && <MobileLoggedInExtra />}
    />
  );
};

export default MobileNavBar;
