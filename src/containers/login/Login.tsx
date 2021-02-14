import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { C4CState } from '../../store';
import { login } from '../../auth/ducks/thunks';
import {
  LoginRequest,
  PrivilegeLevel,
  UserAuthenticationReducerState,
} from '../../auth/ducks/types';
import { getPrivilegeLevel } from '../../auth/ducks/selectors';
import { Alert, Col, Row, Typography } from 'antd';
import { ParagraphProps } from 'antd/lib/typography/Paragraph';
import styled from 'styled-components';
import { BLACK, LIGHT_GREY, TEXT_GREY, WHITE } from '../../colors';
import GreetingContainer from '../../components/greeting-container/GreetingContainer';
import MobilePageHeader from '../../components/mobile-pageheader/MobilePageHeader';
import LoginForm from '../../components/login-form/LoginForm';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/window-dimensions';

const { Paragraph, Title } = Typography;

const OffsetSpanBreakpoint = 715;

const LoginPageContainer = styled.div`
  padding: 120px;
`;

const TabletLoginPageContainer = styled.div`
  padding: 50px;
`;

const MobileLoginPageContainer = styled.div`
  padding: 30px;
`;

const InputContainer = styled(Col)`
  height: 481px;
  min-width: 250px;
  padding: 30px 20px 20px 50px;
  background: ${LIGHT_GREY};
  box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.09);
  border-radius: 6px;
`;

const Line = styled.div`
  height: 2px;
  margin: 10px -20px 80px -50px;
  background: ${WHITE};
`;

const Footer: typeof Paragraph = styled(Paragraph)<ParagraphProps>`
  color: ${TEXT_GREY};
  line-height: 1.5;
  margin-top: 40px;
  margin-bottom: 10px;
`;

const LoginAlert = styled(Alert)`
  width: 90%;
  margin-top: -60px;
  margin-bottom: 20px;
`;

const MobileLoginAlert = styled(Alert)`
  width: 90%;
  margin-bottom: 20px;
`;

const loginErrorMessage = 'The username or email you entered was incorrect.';
const greetingHeader = 'Welcome Back!';
const greetingBody =
  'Dreamcatcher kogi taiyaki keytar. Swag typewriter craft beer\n' +
  'cronut pok pok gentrify flannel salvia deep v pork belly\n' +
  'pitchfork. Swag fashion axe fam. Occupy biodiesel jean shorts\n' +
  'affogato PBR&B freegan bushwick vegan four loko pickled.';

type LoginProps = UserAuthenticationReducerState;

const Login: React.FC<LoginProps> = ({ tokens }) => {
  const { windowType, width } = useWindowDimensions();
  const dispatch = useDispatch();
  const history = useHistory();
  const privilegeLevel = useSelector((state: C4CState) =>
    getPrivilegeLevel(tokens),
  );
  const [loginFailed, setLoginFailed] = useState(false);

  const isLoggedIn: boolean =
    privilegeLevel === PrivilegeLevel.STANDARD ||
    privilegeLevel === PrivilegeLevel.ADMIN;

  const onFinish = (values: LoginRequest) => {
    dispatch(login({ email: values.email, password: values.password }));
    isLoggedIn
      ? history.push('/home')
      : setTimeout(() => setLoginFailed(true), 100);
  };

  const ForgotPasswordFooter = (
    <div>
      <Paragraph>
        <Link to="/">FORGOT PASSWORD?</Link>
      </Paragraph>

      <Footer>
        NEW TO SPEAK FOR THE TREES?
        <br />
        SIGN UP <Link to="/signup">HERE!</Link>
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
                <MobilePageHeader pageTitle="Log In" />
                {loginFailed && (
                  <MobileLoginAlert message={loginErrorMessage} type="error" />
                )}
                <LoginForm onFinish={onFinish} />
                {ForgotPasswordFooter}
              </MobileLoginPageContainer>
            );
          case WindowTypes.Tablet:
            return (
              <TabletLoginPageContainer>
                <Row>
                  <InputContainer span={10}>
                    <Title level={2} style={{ color: BLACK }}>
                      Log In
                    </Title>
                    <Line />
                    {loginFailed && (
                      <LoginAlert message={loginErrorMessage} type="error" />
                    )}
                    <LoginForm onFinish={onFinish} />
                    {ForgotPasswordFooter}
                  </InputContainer>

                  <Col span={`${width < OffsetSpanBreakpoint ? 1 : 2}`} />

                  <Col span={12}>
                    <GreetingContainer
                      header={greetingHeader}
                      body={greetingBody}
                    />
                  </Col>
                </Row>
              </TabletLoginPageContainer>
            );
          case WindowTypes.NarrowDesktop:
          case WindowTypes.Desktop:
            return (
              <LoginPageContainer>
                <Row>
                  <InputContainer span={10}>
                    <Title level={2} style={{ color: BLACK }}>
                      Log In
                    </Title>
                    <Line />
                    {loginFailed && (
                      <LoginAlert message={loginErrorMessage} type="error" />
                    )}
                    <LoginForm onFinish={onFinish} />
                    {ForgotPasswordFooter}
                  </InputContainer>

                  <Col span={2} />

                  <Col span={12}>
                    <GreetingContainer
                      header={greetingHeader}
                      body={greetingBody}
                    />
                  </Col>
                </Row>
              </LoginPageContainer>
            );
        }
      })()}
    </>
  );
};

const mapStateToProps = (state: C4CState): LoginProps => {
  return {
    tokens: state.authenticationState.tokens,
  };
};

export default connect(mapStateToProps)(Login);
