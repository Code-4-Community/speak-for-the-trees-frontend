import React from 'react';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import { Alert, Col, Form, Row, Typography } from 'antd';
import { Helmet } from 'react-helmet';
import GreetingContainer from '../../components/greetingContainer';
import { getUserData } from '../../auth/ducks/thunks';
import { connect, useDispatch, useSelector } from 'react-redux';
import { UserAuthenticationReducerState } from '../../auth/ducks/types';
import { C4CState } from '../../store';
import { BLACK, LIGHT_GREY, WHITE } from '../../utils/colors';
import styled from 'styled-components';
import {
  CenterDiv,
  InputContainer,
  TabletPageContainer,
} from '../../components/themedComponents';
import PageHeader from '../../components/pageHeader';
import SignupForm from '../../components/forms/signupForm';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/windowDimensions';
import PageLayout from '../../components/pageLayout';
import { AsyncRequestKinds } from '../../utils/asyncRequest';
import { RedirectStateProps, Routes } from '../../App';
import { isLoggedIn } from '../../auth/ducks/selectors';
import { SIGNUP_BODY, SIGNUP_HEADER, SIGNUP_TITLE } from '../../assets/content';

const SignupPageContainer = styled.div`
  margin: auto;
  width: 80vw;
`;

const MobileSignupPageContainer = styled.div`
  padding: 30px;
`;

export const TabletInputContainer = styled.div`
  height: 55vh;
  width: 100%;
  padding: 2vh 120px 0px 50px;
  background: ${LIGHT_GREY};
  box-shadow: 2px 3px 6px ${BLACK}25;
  border-radius: 6px;
  overflow: auto;
`;

const Line = styled.div`
  height: 2px;
  margin: 0px -120px 30px -50px;
  background: ${WHITE};
`;

const TabletLine = styled.div`
  height: 2px;
  margin: -10px -120px 2vh -50px;
  background: ${WHITE};
`;

const Title = styled(Typography.Paragraph)`
  color: ${BLACK};
  font-size: 30px;
  line-height: 33px;
`;

const SignupAlert = styled(Alert)`
  margin-top: -40px;
  margin-bottom: 20px;
`;

const MobileSignupAlert = styled(Alert)`
  margin-bottom: 20px;
`;

interface SignupProps {
  tokens: UserAuthenticationReducerState['tokens'];
}

const Signup: React.FC<SignupProps> = ({ tokens }) => {
  const { windowType } = useWindowDimensions();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<RedirectStateProps>();
  const loggedIn = useSelector((state: C4CState) =>
    isLoggedIn(state.authenticationState.tokens),
  );
  const [signupForm] = Form.useForm();

  if (loggedIn) {
    dispatch(getUserData());
    const destination = location.state
      ? location.state.destination
      : Routes.HOME;
    history.push(destination);
  }

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
        <meta
          name="description"
          content="Where the user can create a new account"
        />
      </Helmet>
      {(() => {
        switch (windowType) {
          case WindowTypes.Mobile:
            return (
              <>
                <MobileSignupPageContainer>
                  <PageHeader pageTitle={SIGNUP_TITLE} isMobile={true} />
                  {tokens.kind === AsyncRequestKinds.Failed && (
                    <MobileSignupAlert message={tokens.error} type="error" />
                  )}
                  <SignupForm
                    formInstance={signupForm}
                    windowType={windowType}
                  />
                </MobileSignupPageContainer>
              </>
            );
          case WindowTypes.Tablet:
            return (
              <PageLayout>
                <TabletPageContainer>
                  {tokens.kind === AsyncRequestKinds.Failed && (
                    <SignupAlert message={tokens.error} type="error" />
                  )}
                  <CenterDiv>
                    <TabletInputContainer>
                      <Title>{SIGNUP_TITLE}</Title>
                      <TabletLine />
                      <SignupForm
                        formInstance={signupForm}
                        windowType={windowType}
                      />
                    </TabletInputContainer>
                  </CenterDiv>

                  <br />

                  <CenterDiv>
                    <GreetingContainer
                      header={SIGNUP_HEADER}
                      body={SIGNUP_BODY}
                      padding={'2vh 5vw 0px'}
                      height={'25vh'}
                    />
                  </CenterDiv>
                </TabletPageContainer>
              </PageLayout>
            );
          case WindowTypes.NarrowDesktop:
          case WindowTypes.Desktop:
            return (
              <>
                <PageLayout>
                  <SignupPageContainer>
                    {tokens.kind === AsyncRequestKinds.Failed && (
                      <SignupAlert message={tokens.error} type="error" />
                    )}
                    <Row>
                      <InputContainer span={11}>
                        <Title>{SIGNUP_TITLE}</Title>
                        <Line />
                        <SignupForm
                          formInstance={signupForm}
                          windowType={windowType}
                        />
                      </InputContainer>

                      <Col span={2} />

                      <Col span={11}>
                        <GreetingContainer
                          header={SIGNUP_HEADER}
                          body={SIGNUP_BODY}
                        />
                      </Col>
                    </Row>
                  </SignupPageContainer>
                </PageLayout>
              </>
            );
        }
      })()}
    </>
  );
};

const mapStateToProps = (state: C4CState): SignupProps => {
  return {
    tokens: state.authenticationState.tokens,
  };
};

export default connect(mapStateToProps)(Signup);
