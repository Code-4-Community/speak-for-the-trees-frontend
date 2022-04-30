import React from 'react';
import { useLocation } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import { Button, Col, Form, message, Row, Typography } from 'antd';
import { Helmet } from 'react-helmet';
import GreetingContainer from '../../components/greetingContainer';
import { getUserData, signup } from '../../auth/ducks/thunks';
import { connect, useDispatch, useSelector } from 'react-redux';
import { UserAuthenticationReducerState } from '../../auth/ducks/types';
import { C4CState } from '../../store';
import { BLACK, TEXT_GREY, WHITE } from '../../utils/colors';
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
import { RedirectStateProps, Routes } from '../../App';
import { isLoggedIn } from '../../auth/ducks/selectors';
import { SIGNUP_BODY, SIGNUP_HEADER, SIGNUP_TITLE } from '../../assets/content';
import { SignupFormValues } from '../../components/forms/ducks/types';
import { ParagraphProps } from 'antd/lib/typography/Paragraph';

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

const offsetSpan = 1;

const Footer: typeof Typography.Paragraph = styled(Typography.Paragraph)<
  ParagraphProps
>`
  color: ${TEXT_GREY};
  line-height: 1.5;
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
                  <SignupForm formInstance={signupForm} onFinish={onSignup}>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" size="large">
                        Sign Up
                      </Button>
                    </Form.Item>
                    <Footer>
                      ALREADY HAVE AN ACCOUNT?
                      <br />
                      LOGIN <Link to={Routes.LOGIN}>HERE!</Link>
                    </Footer>
                  </SignupForm>
                </MobileSignupPageContainer>
              </>
            );
          case WindowTypes.Tablet:
          case WindowTypes.NarrowDesktop:
          case WindowTypes.Desktop:
            return (
              <PageLayout>
                <InputGreetingContainer>
                  <InputContainer>
                    <Title>{SIGNUP_TITLE}</Title>
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
                              Sign Up
                            </Button>
                          </Form.Item>
                        </Col>
                        <Col span={offsetSpan} />
                        <Col>
                          <Footer>
                            ALREADY HAVE AN ACCOUNT?
                            <br />
                            LOGIN <Link to={Routes.LOGIN}>HERE!</Link>
                          </Footer>
                        </Col>
                      </Row>
                    </SignupForm>
                  </InputContainer>

                  <GreetingContainer
                    header={SIGNUP_HEADER}
                    body={SIGNUP_BODY}
                  />
                </InputGreetingContainer>
              </PageLayout>
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
