import React from 'react';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../../App';
import styled from 'styled-components';
import { PageHeader, Dropdown } from 'antd';
import { PageHeaderProps } from 'antd/es/page-header';
import { MenuOutlined } from '@ant-design/icons';
import { MID_GREEN, BACKGROUND_GREY } from '../../../utils/colors';
import Logo from '../../../assets/images/nav-bar-icon.png';
import NavMenu from '../navMenu';

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
  padding-top: 35px;
  background: ${BACKGROUND_GREY};
  color: ${MID_GREEN};
  font-weight: 700;
`;

const FlexDiv = styled.div`
  display: flex;
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
        isLoggedIn && (
          <FlexDiv>
            <Dropdown
              overlay={<NavMenu isAdmin={isAdmin} onLogout={onLogout} />}
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
