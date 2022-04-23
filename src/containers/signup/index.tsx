import React from 'react';
import { Redirect } from 'react-router-dom';
import { Form, message, Typography } from 'antd';
import { Helmet } from 'react-helmet';
import GreetingContainer from '../../components/greetingContainer';
import { signup } from '../../auth/ducks/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { C4CState } from '../../store';
import { BLACK, WHITE } from '../../utils/colors';
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
import { useLocation } from 'react-router';

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

const Signup: React.FC = () => {
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
                    <SignupForm
                      formInstance={signupForm}
                      onFinish={onSignup}
                      windowType={windowType}
                    />
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
                      <SignupForm
                        formInstance={signupForm}
                        onFinish={onSignup}
                        windowType={windowType}
                      />
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
  }
};

export default Signup;
