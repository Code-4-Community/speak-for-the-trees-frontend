import React from 'react';
import { Col, Row, Typography } from 'antd';
import { ParagraphProps } from 'antd/lib/typography/Paragraph';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import GreetingContainer from '../../components/greeting-container/GreetingContainer';
import { login } from '../../auth/ducks/thunks';
import { connect, useDispatch } from 'react-redux';
import { C4CState } from '../../store';
import { UserAuthenticationReducerState } from '../../auth/ducks/types';
import { BLACK, LIGHT_GREY, TEXT_GREY, WHITE } from '../../colors';
import styled from 'styled-components';
import MobilePageHeader from '../../components/mobile-pageheader/MobilePageHeader';
import LoginForm from '../../components/login-form/LoginForm';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/window-dimensions';

const { Paragraph, Title } = Typography;

const MobileSpanBreakpoint = 715;

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

type LoginProps = UserAuthenticationReducerState;

const Login: React.FC<LoginProps> = ({ tokens }) => {
  const { windowType, width } = useWindowDimensions();
  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    dispatch(login({ email: values.email, password: values.password }));
  };

  const greetingHeader = 'Welcome Back!';

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

  switch (windowType) {
    case WindowTypes.Mobile:
      return (
        <>
          <Helmet>
            <title>Login</title>
            <meta name="description" content="Description goes here." />
          </Helmet>
          <MobileLoginPageContainer>
            <MobilePageHeader pageTitle="Log In" />
            <LoginForm onFinish={onFinish} />
            {ForgotPasswordFooter}
          </MobileLoginPageContainer>
        </>
      );
    case WindowTypes.Tablet:
      return (
        <>
          <Helmet>
            <title>Login</title>
            <meta name="description" content="Description goes here." />
          </Helmet>
          <TabletLoginPageContainer>
            <Row>
              <InputContainer span={10}>
                <Title level={2} style={{ color: BLACK }}>
                  Log In
                </Title>
                <Line />
                <LoginForm onFinish={onFinish} />
                {ForgotPasswordFooter}
              </InputContainer>

              <Col span={`${width < MobileSpanBreakpoint ? 1 : 2}`} />

              <Col span={12}>
                <GreetingContainer
                  header={greetingHeader}
                  body="Dreamcatcher kogi taiyaki keytar. Swag typewriter craft beer
              cronut pok pok gentrify flannel salvia deep v pork belly
              pitchfork. Swag fashion axe fam. Occupy biodiesel jean shorts
              affogato PBR&B freegan bushwick vegan four loko pickled."
                />
              </Col>
            </Row>
          </TabletLoginPageContainer>
        </>
      );
    default:
      return (
        <>
          <Helmet>
            <title>Login</title>
            <meta name="description" content="Description goes here." />
          </Helmet>
          <LoginPageContainer>
            <Row>
              <InputContainer span={10}>
                <Title level={2} style={{ color: BLACK }}>
                  Log In
                </Title>
                <Line />
                <LoginForm onFinish={onFinish} />
                {ForgotPasswordFooter}
              </InputContainer>

              <Col span={`${width < MobileSpanBreakpoint ? 1 : 2}`} />

              <Col span={12}>
                <GreetingContainer
                  header={greetingHeader}
                  body="Dreamcatcher kogi taiyaki keytar. Swag typewriter craft beer
              cronut pok pok gentrify flannel salvia deep v pork belly
              pitchfork. Swag fashion axe fam. Occupy biodiesel jean shorts
              affogato PBR&B freegan bushwick vegan four loko pickled."
                />
              </Col>
            </Row>
          </LoginPageContainer>
        </>
      );
  }
};

const mapStateToProps = (state: C4CState): LoginProps => {
  return {
    tokens: state.authenticationState.tokens,
  };
};

export default connect(mapStateToProps)(Login);
