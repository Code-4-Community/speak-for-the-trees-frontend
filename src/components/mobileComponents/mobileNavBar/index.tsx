import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  UserAuthenticationReducerState,
} from '../../../auth/ducks/types';
import { Routes } from '../../../App';
import styled from 'styled-components';
import { PageHeader, Button, Menu, Dropdown } from 'antd';
import { PageHeaderProps } from 'antd/es/page-header';
import { MenuOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import {
  MID_GREEN,
  DARK_GREY,
  BACKGROUND_GREY,
  WHITE,
} from '../../../utils/colors';
import Logo from '../../../assets/images/nav-bar-icon.png';
import { asyncRequestIsComplete } from '../../../utils/asyncRequest';
import { logout } from '../../../auth/ducks/thunks';

interface MobileNavBarProps {
  readonly isLoggedIn: boolean;
  readonly tokens: UserAuthenticationReducerState['tokens'];
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

const MobileNavBar: React.FC<MobileNavBarProps> = ({ isLoggedIn, tokens }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <MobileNavHeader
      className="page-header"
      title=""
      subTitle="Speak for the Trees"
      backIcon={
        <img
          className="back-icon"
          src={Logo}
          alt="icon"
          style={{
            height: '30px',
          }}
        />
      }
      onBack={() => history.push(Routes.LANDING)}
      extra={
        isLoggedIn && (
          <FlexDiv>
            <Dropdown
              overlay={
                <RightMenu>
                  <GreyItem
                    onClick={() => {
                      history.push(Routes.SETTINGS);
                    }}
                  >
                    Account Settings
                  </GreyItem>
                  <Menu.Item>
                    <LogoutButton
                      type="primary"
                      size="large"
                      onClick={() => {
                        if (asyncRequestIsComplete(tokens)) {
                          dispatch(logout());
                          history.go(0);
                        }
                      }}
                    >
                      Log Out
                    </LogoutButton>
                  </Menu.Item>
                </RightMenu>
              }
              placement="bottomLeft"
            >
              <MobileDropdownMenu />
            </Dropdown>
          </FlexDiv>
        )
      }
    />
  );
};

export default MobileNavBar;
