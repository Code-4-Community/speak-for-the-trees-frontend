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
import { site } from '../../constants';
import { Form, message, Typography } from 'antd';
import styled from 'styled-components';
import { BLACK, DARK_TEXT_GREY, WHITE } from '../../utils/colors';
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
import { Trans, useTranslation } from 'react-i18next';
import { n } from '../../utils/stringFormat';

const MobileLoginPageContainer = styled.div`
  padding: 30px;
`;

const Line = styled.div`
  height: 2px;
  margin: 10px -120px 8vh -50px;
  background: ${WHITE};
`;

const Footer = styled(Typography.Paragraph)`
  color: ${DARK_TEXT_GREY};
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
  const { t } = useTranslation(n(site, ['login']), { nsMode: 'fallback' });

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
    const onError = () => message.error(t('login_error'));

    dispatch(
      login({ email: values.email, password: values.password }, onError),
    );
  };

  const ForgotPasswordFooter = (
    <div>
      <Link to={Routes.FORGOT_PASSWORD_REQUEST}>
        {t('forgot_password.header')}
      </Link>

      <Footer>
        {t('forgot_password.new_to_sftt')}
        <br />
        <Trans
          ns={'login'}
          i18nKey="forgot_password.sign_up"
          components={{
            signUpLink: (
              <Link
                to={{
                  pathname: Routes.SIGNUP,
                  state: { destination },
                }}
              />
            ),
          }}
        />
      </Footer>
    </div>
  );

  if (loggedIn) {
    return <Redirect to={destination} />;
  } else {
    return (
      <>
        <Helmet>
          <title>{t('title')}</title>
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
                  <PageHeader pageTitle={t('title')} isMobile={true} />
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
                      <Title>{t('title')}</Title>
                      <Line />
                      <LoginForm
                        formInstance={loginForm}
                        onFinish={onFinish}
                        windowType={windowType}
                      />
                      {ForgotPasswordFooter}
                    </InputContainer>

                    <GreetingContainer
                      header={t('welcome_back.header')}
                      body={t('welcome_back.body', { joinArrays: ' ' })}
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
