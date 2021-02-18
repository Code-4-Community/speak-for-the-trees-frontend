import React from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTE } from '../../../App';
import styled from 'styled-components';
import { Button, Typography } from 'antd';
import {
  LIGHT_GREEN,
  LIGHT_GREY,
  MID_GREEN,
  WHITE,
  BLACK,
} from '../../../colors';

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
  width: 200px;
`;

const MobileTitle = styled(Paragraph)`
  color: ${MID_GREEN};
  font-size: 18px;
  font-weight: 500;
`;

const MobileParagraph = styled(Paragraph)`
  font-size: 7px;
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
  margin: 0px -30px;
`;

const MobileLandingBar: React.FC = ({ children }) => {
  const history = useHistory();

  return (
    <>
      <MobileBarContentContainer>
        <TitleButtonsContainer>
          <TitleContainer>
            <MobileTitle>Boston's Street Trees</MobileTitle>
            <MobileParagraph>
              Dreamcatcher kogi taiyaki keytar. Swag typewriter craft beer
              cronut pok pok gentrify flannel salvia deep v pork belly
              pitchfork. Swag fashion axe fam. Occupy biodiesel jean shorts
              affogato PBR&B freegan bushwick vegan four loko pickled.
            </MobileParagraph>
          </TitleContainer>
          <ButtonsContainer>
            <div>
              <LoginButton
                type="primary"
                htmlType="submit"
                size="large"
                onClick={() => history.push(ROUTE.LOGIN)}
              >
                Log In
              </LoginButton>
            </div>
            <div>
              <SignUpButton
                type="primary"
                htmlType="submit"
                size="large"
                onClick={() => history.push(ROUTE.SIGNUP)}
              >
                Sign Up
              </SignUpButton>
            </div>
          </ButtonsContainer>
        </TitleButtonsContainer>
        <LandingStatsContainer>{children}</LandingStatsContainer>
      </MobileBarContentContainer>
    </>
  );
};

export default MobileLandingBar;
