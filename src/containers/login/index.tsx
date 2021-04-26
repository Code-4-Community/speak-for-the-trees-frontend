import React from 'react';
import { useLocation } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { C4CState } from '../../store';
import { login, getUserData } from '../../auth/ducks/thunks';
import {
  LoginRequest,
  PrivilegeLevel,
  UserAuthenticationReducerState,
} from '../../auth/ducks/types';
import { getPrivilegeLevel } from '../../auth/ducks/selectors';
import { asyncRequestIsFailed } from '../../utils/asyncRequest';
import { RedirectStateProps, Routes } from '../../App';
import { Alert, Col, Form, Row, Typography } from 'antd';
import styled from 'styled-components';
import { BLACK, LIGHT_GREY, TEXT_GREY, WHITE } from '../../utils/colors';
import {
  CenterDiv,
  InputContainer,
  TabletPageContainer,
} from '../../components/themedComponents';
import GreetingContainer from '../../components/greetingContainer';
import MobilePageHeader from '../../components/mobileComponents/mobilePageHeader';
import PageLayout from '../../components/pageLayout';
import LoginForm from '../../components/loginForm';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/windowDimensions';
import {
  LOGIN_BODY,
  LOGIN_ERROR,
  LOGIN_HEADER,
  LOGIN_TITLE,
} from '../../assets/content';

const { Paragraph } = Typography;

const LoginPageContainer = styled.div`
  margin: auto;
  width: 80vw;
`;

const MobileLoginPageContainer = styled.div`
  padding: 30px;
`;

export const TabletInputContainer = styled.div`
  height: 50vh;
  width: 100%;
  padding: 3vh 120px 0px 50px;
  background: ${LIGHT_GREY};
  box-shadow: 2px 3px 6px ${BLACK}25;
  border-radius: 6px;
  overflow: scroll;
`;

const Line = styled.div`
  height: 2px;
  margin: 10px -120px 8vh -50px;
  background: ${WHITE};
`;

const TabletLine = styled.div`
  height: 2px;
  margin: 10px -120px 4vh -50px;
  background: ${WHITE};
`;

const Footer = styled(Paragraph)`
  color: ${TEXT_GREY};
  line-height: 1.5;
  margin-top: 1.5vh;
  margin-bottom: -10px;
`;

const Title = styled(Paragraph)`
  color: ${BLACK};
  font-size: 30px;
  line-height: 36px;
`;

const LoginAlert = styled(Alert)`
  width: 90%;
  margin-bottom: 20px;
`;

const MobileLoginAlert = styled(Alert)`
  width: 90%;
  margin-bottom: 20px;
`;

type LoginProps = UserAuthenticationReducerState;

const Login: React.FC<LoginProps> = ({ tokens, userData }) => {
  const { windowType } = useWindowDimensions();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<RedirectStateProps>();
  const privilegeLevel = useSelector((state: C4CState) =>
    getPrivilegeLevel(state.authenticationState.tokens),
  );
  const [loginForm] = Form.useForm();

  const destination: Routes = location.state
    ? location.state.destination
    : Routes.HOME;

  if (privilegeLevel !== PrivilegeLevel.NONE) {
    dispatch(getUserData());
    history.push(destination);
  }

  const loginFailed: boolean = asyncRequestIsFailed(tokens);

  const onFinish = (values: LoginRequest) => {
    dispatch(login({ email: values.email, password: values.password }));
  };

  const ForgotPasswordFooter = (
    <div>
      <Link to={Routes.FORGOT_PASSWORD_REQUEST}>FORGOT PASSWORD?</Link>

      <Footer>
        NEW TO SPEAK FOR THE TREES?
        <br />
        SIGN UP{' '}
        <Link
          to={{
            pathname: Routes.SIGNUP,
            state: { destination },
          }}
        >
          HERE!
        </Link>
      </Footer>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta
          name="login"
          content="Where the user can log into their account."
        />
      </Helmet>

      {(() => {
        switch (windowType) {
          case WindowTypes.Mobile:
            return (
              <MobileLoginPageContainer>
                <MobilePageHeader pageTitle={LOGIN_TITLE} />
                {loginFailed && (
                  <MobileLoginAlert message={LOGIN_ERROR} type="error" />
                )}
                <LoginForm
                  formInstance={loginForm}
                  onFinish={onFinish}
                  windowType={windowType}
                />
                {ForgotPasswordFooter}
              </MobileLoginPageContainer>
            );
          case WindowTypes.Tablet:
            return (
              <PageLayout>
                <TabletPageContainer>
                  <CenterDiv>
                    <TabletInputContainer>
                      <Title>{LOGIN_TITLE}</Title>
                      <TabletLine />
                      {loginFailed && (
                        <LoginAlert message={LOGIN_ERROR} type="error" />
                      )}
                      <LoginForm
                        formInstance={loginForm}
                        onFinish={onFinish}
                        windowType={windowType}
                      />
                      {ForgotPasswordFooter}
                    </TabletInputContainer>
                  </CenterDiv>

                  <br />

                  <CenterDiv>
                    <GreetingContainer
                      header={LOGIN_HEADER}
                      body={LOGIN_BODY}
                      height="30vh"
                    />
                  </CenterDiv>
                </TabletPageContainer>
              </PageLayout>
            );
          case WindowTypes.NarrowDesktop:
          case WindowTypes.Desktop:
            return (
              <PageLayout>
                <LoginPageContainer>
                  <Row>
                    <InputContainer span={10}>
                      <Title>{LOGIN_TITLE}</Title>
                      <Line />
                      {loginFailed && (
                        <LoginAlert message={LOGIN_ERROR} type="error" />
                      )}
                      <LoginForm
                        formInstance={loginForm}
                        onFinish={onFinish}
                        windowType={windowType}
                      />
                      {ForgotPasswordFooter}
                    </InputContainer>

                    <Col span={2} />

                    <Col span={12}>
                      <GreetingContainer
                        header={LOGIN_HEADER}
                        body={LOGIN_BODY}
                      />
                    </Col>
                  </Row>
                </LoginPageContainer>
              </PageLayout>
            );
        }
      })()}
    </>
  );
};

const mapStateToProps = (state: C4CState): LoginProps => {
  return {
    tokens: state.authenticationState.tokens,
    userData: state.authenticationState.userData,
  };
};

export default connect(mapStateToProps)(Login);
