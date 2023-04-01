import React from 'react';
import { Redirect, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Col, Form, message, Row, Typography } from 'antd';
import { Helmet } from 'react-helmet';
import GreetingContainer from '../../components/greetingContainer';
import { signup } from '../../auth/ducks/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { C4CState } from '../../store';
import { BLACK, DARK_TEXT_GREY, WHITE } from '../../utils/colors';
import styled from 'styled-components';
import {
  InputContainer,
  InputGreetingContainer,
} from '../../components/themedComponents';
import PageHeader from '../../components/pageHeader';
import SignupForm from '../../components/forms/signupForm';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/windowDimensions';
import PageLayout from '../../components/pageLayout';
import { RedirectStateProps, Routes, site } from '../../App';
import { isLoggedIn } from '../../auth/ducks/selectors';
import { SignupFormValues } from '../../components/forms/ducks/types';
import { Trans, useTranslation } from 'react-i18next';
import { n } from '../../utils/stringFormat';

const MobileSignupPageContainer = styled.div`
  padding: 30px;
`;

const Line = styled.div`
  height: 2px;
  margin: 0px -120px 30px -50px;
  background: ${WHITE};
`;

const Title = styled(Typography.Paragraph)`
  color: ${BLACK};
  font-size: 30px;
  line-height: 33px;
`;

const Footer = styled(Typography.Paragraph)`
  color: ${DARK_TEXT_GREY};
  line-height: 1.5;
`;

const offsetSpan = 1;

const Signup: React.FC = () => {
  const { t } = useTranslation(n(site, ['signup', 'forms']), {
    nsMode: 'fallback',
  });

  const { windowType } = useWindowDimensions();
  const dispatch = useDispatch();
  const location = useLocation<RedirectStateProps>();
  const loggedIn = useSelector((state: C4CState) =>
    isLoggedIn(state.authenticationState.tokens),
  );
  const [signupForm] = Form.useForm();

  const destination: Routes = location.state
    ? location.state.destination
    : Routes.HOME;

  const onSignup = (values: SignupFormValues) => {
    const onError = (msg: string) => message.error(msg);

    dispatch(
      signup(
        {
          email: values.email,
          username: values.username,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
        },
        onError,
      ),
    );
  };

  if (loggedIn) {
    return <Redirect to={destination} />;
  } else {
    return (
      <>
        <Helmet>
          <title>{t('title')}</title>
          <meta
            name="description"
            content="Where the user can create a new account"
          />
        </Helmet>
        {(() => {
          switch (windowType) {
            case WindowTypes.Mobile:
              return (
                <MobileSignupPageContainer>
                  <PageHeader pageTitle={t('title')} isMobile={true} />
                  <SignupForm formInstance={signupForm} onFinish={onSignup}>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" size="large">
                        {t('sign_up')}
                      </Button>
                    </Form.Item>
                    <Footer>
                      {t('have_account.already_have_account')}
                      <br />
                      <Trans
                        ns="signup"
                        i18nKey="have_account.login_here"
                        components={{
                          loginLink: <Link to={Routes.LOGIN} />,
                        }}
                      />
                    </Footer>
                  </SignupForm>
                </MobileSignupPageContainer>
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
                      <SignupForm formInstance={signupForm} onFinish={onSignup}>
                        <Row>
                          <Col>
                            <Form.Item>
                              <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                              >
                                {t('sign_up')}
                              </Button>
                            </Form.Item>
                          </Col>
                          <Col span={offsetSpan} />
                          <Col>
                            <Footer>
                              {t('have_account.already_have_account')}
                              <br />
                              <Trans
                                ns="signup"
                                i18nKey="have_account.login_here"
                                components={{
                                  loginLink: <Link to={Routes.LOGIN} />,
                                }}
                              />
                            </Footer>
                          </Col>
                        </Row>
                      </SignupForm>
                    </InputContainer>

                    <GreetingContainer
                      header={t('header')}
                      body={t('body', { joinArrays: ' ' })}
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

export default Signup;
