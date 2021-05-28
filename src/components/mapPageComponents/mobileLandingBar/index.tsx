import React from 'react';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../../App';
import styled from 'styled-components';
import { Button, Typography } from 'antd';
import {
  LIGHT_GREEN,
  LIGHT_GREY,
  MID_GREEN,
  WHITE,
  BLACK,
} from '../../../utils/colors';

const { Paragraph } = Typography;

const MobileBarContentContainer = styled.div`
  display: block;
  height: 35vh;
`;

const TitleButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90vw;
  margin: 0px -30px;
`;

const TitleContainer = styled.div`
  display: inline-block;
  min-width: 200px;
  max-width: 95%;
`;

const MobileTitle = styled(Paragraph)`
  color: ${MID_GREEN};
  font-size: 18px;
  font-weight: 500;
  line-height: 15px;
`;

const MobileParagraph = styled(Paragraph)`
  font-size: 9px;
`;

const ButtonsContainer = styled.div`
  display: inline-block;
  margin-left: 30px;
`;

const LoginButton = styled(Button)`
  width: 100px;
  height: 50px;
  background: ${WHITE};
  border-color: ${LIGHT_GREY};
  color: ${BLACK};
`;

const SignUpButton = styled(Button)`
  width: 100px;
  height: 50px;
  margin-top: 15px;
  background-color: ${LIGHT_GREEN};
  border-color: ${LIGHT_GREEN};
`;

const LandingStatsContainer = styled.div`
  width: 90vw;
  margin: 0vh -30px;
`;

interface MobileLandingBarProps {
  readonly barHeader: string;
  readonly barDescription: string;
  readonly isLoggedIn: boolean;
}

const MobileLandingBar: React.FC<MobileLandingBarProps> = ({
  barHeader,
  barDescription,
  isLoggedIn,
  children,
}) => {
  const history = useHistory();

  return (
    <>
      <MobileBarContentContainer>
        <TitleButtonsContainer>
          <TitleContainer>
            <MobileTitle>{barHeader}</MobileTitle>
            <MobileParagraph>{barDescription}</MobileParagraph>
          </TitleContainer>
          {!isLoggedIn && (
            <ButtonsContainer>
              <div>
                <LoginButton
                  type="primary"
                  htmlType="submit"
                  size="large"
                  onClick={() => history.push(Routes.LOGIN)}
                >
                  Log In
                </LoginButton>
              </div>
              <div>
                <SignUpButton
                  type="primary"
                  htmlType="submit"
                  size="large"
                  onClick={() => history.push(Routes.SIGNUP)}
                >
                  Sign Up
                </SignUpButton>
              </div>
            </ButtonsContainer>
          )}
        </TitleButtonsContainer>
        <LandingStatsContainer>{children}</LandingStatsContainer>
      </MobileBarContentContainer>
    </>
  );
};

export default MobileLandingBar;
