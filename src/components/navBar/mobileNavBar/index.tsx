import React from 'react';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../../App';
import styled from 'styled-components';
import PageHeader from 'antd/es/page-header';
import Dropdown from 'antd/es/dropdown';
import type { PageHeaderProps } from 'antd/es/page-header';
import MenuOutlined from '@ant-design/icons/MenuOutlined';
import { MID_GREEN, BACKGROUND_GREY, LIGHT_GREEN } from '../../../utils/colors';
import Logo from '../../../assets/images/nav-bar-icon.png';
import NavMenu from '../navMenu';
import { LinkButton } from '../../linkButton';

interface MobileNavBarProps {
  readonly isLoggedIn: boolean;
  readonly isAdmin: boolean;
  readonly onLogout: () => void;
}

const MobileDropdownMenu = styled(MenuOutlined)`
  display: inline-flex;
  font-size: 25px;
`;

const MobileNavHeader: typeof PageHeader = styled(PageHeader)<PageHeaderProps>`
  box-shadow: '0 4px 2px -2px grey';
  width: 100%;
  margin: '0 0 3px 0';
  background: ${BACKGROUND_GREY};
  color: ${MID_GREEN};
  font-weight: 700;
`;

const FlexDiv = styled.div`
  display: flex;
`;

const SignUpButton = styled(LinkButton)`
  width: 90px;
  height: 40px;
  background-color: ${LIGHT_GREEN};
  border-color: ${LIGHT_GREEN};
`;

const MobileNavBar: React.FC<MobileNavBarProps> = ({
  isLoggedIn,
  isAdmin,
  onLogout,
}) => {
  const history = useHistory();

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
        isLoggedIn ? (
          <FlexDiv>
            <Dropdown
              overlay={<NavMenu isAdmin={isAdmin} onLogout={onLogout} />}
              placement="bottomLeft"
            >
              <MobileDropdownMenu />
            </Dropdown>
          </FlexDiv>
        ) : (
          <SignUpButton
            type="primary"
            htmlType="submit"
            size="large"
            to={Routes.SIGNUP}
          >
            Sign Up
          </SignUpButton>
        )
      }
    />
  );
};

export default MobileNavBar;
