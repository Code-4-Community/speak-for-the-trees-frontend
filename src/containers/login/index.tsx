import React from 'react';
import { useLocation } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { C4CState } from '../../store';
import { login } from '../../auth/ducks/thunks';
import { LoginRequest } from '../../auth/ducks/types';
import { isLoggedIn } from '../../auth/ducks/selectors';
import { RedirectStateProps, Routes } from '../../App';
import { Form, message, Typography } from 'antd';
import styled from 'styled-components';
import { BLACK, TEXT_GREY, WHITE } from '../../utils/colors';
import {
  InputContainer,
  InputGreetingContainer,
} from '../../components/themedComponents';
import GreetingContainer from '../../components/greetingContainer';
import PageHeader from '../../components/pageHeader';
import PageLayout from '../../components/pageLayout';
import LoginForm from '../../components/forms/loginForm';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/windowDimensions';
import {
  LOGIN_BODY,
  LOGIN_ERROR,
  LOGIN_HEADER,
  LOGIN_TITLE,
} from '../../assets/content';

const MobileLoginPageContainer = styled.div`
  padding: 30px;
`;

const Line = styled.div`
  height: 2px;
  margin: 10px -120px 8vh -50px;
  background: ${WHITE};
`;

const Footer = styled(Typography.Paragraph)`
  color: ${TEXT_GREY};
  line-height: 1.5;
  margin-top: 1.5vh;
  margin-bottom: -10px;
`;

const Title = styled(Typography.Paragraph)`
  color: ${BLACK};
  font-size: 30px;
  line-height: 36px;
`;

const Login: React.FC = () => {
  const { windowType } = useWindowDimensions();
  const dispatch = useDispatch();
  const location = useLocation<RedirectStateProps>();
  const loggedIn = useSelector((state: C4CState) =>
    isLoggedIn(state.authenticationState.tokens),
  );
  const [loginForm] = Form.useForm();

  const destination: Routes = location.state
    ? location.state.destination
    : Routes.HOME;

  const onFinish = (values: LoginRequest) => {
    const onError = () => message.error(LOGIN_ERROR);

    dispatch(
      login({ email: values.email, password: values.password }, onError),
    );
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

  if (loggedIn) {
    return <Redirect to={destination} />;
  } else {
    return (
      <>
        <Helmet>
          <title>Login</title>
          <meta
            name="description"
            content="Where the user can log into their account."
          />
        </Helmet>

        {(() => {
          switch (windowType) {
            case WindowTypes.Mobile:
              return (
                <MobileLoginPageContainer>
                  <PageHeader pageTitle={LOGIN_TITLE} isMobile={true} />
                  <LoginForm
                    formInstance={loginForm}
                    onFinish={onFinish}
                    windowType={windowType}
                  />
                  {ForgotPasswordFooter}
                </MobileLoginPageContainer>
              );
            case WindowTypes.Tablet:
            case WindowTypes.NarrowDesktop:
            case WindowTypes.Desktop:
              return (
                <PageLayout>
                  <InputGreetingContainer>
                    <InputContainer>
                      <Title>{LOGIN_TITLE}</Title>
                      <Line />
                      <LoginForm
                        formInstance={loginForm}
                        onFinish={onFinish}
                        windowType={windowType}
                      />
                      {ForgotPasswordFooter}
                    </InputContainer>

                    <GreetingContainer
                      header={LOGIN_HEADER}
                      body={LOGIN_BODY}
                    />
                  </InputGreetingContainer>
                </PageLayout>
              );
          }
        })()}
      </>
    );
  }
};

export default Login;
