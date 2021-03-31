import React from 'react';
import { useLocation } from 'react-router';
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
import { AsyncRequestKinds } from '../../utils/asyncRequest';
import { RedirectStateProps, Routes } from '../../App';
import { Alert, Col, Row, Typography } from 'antd';
import styled from 'styled-components';
import { BLACK, LIGHT_GREY, TEXT_GREY, WHITE } from '../../utils/colors';
import GreetingContainer from '../../components/greetingContainer';
import MobilePageHeader from '../../components/mobileComponents/mobilePageHeader';
import PageLayout from '../../components/pageLayout';
import LoginForm from '../../components/loginForm';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/window-dimensions';
import {
  LOGIN_BODY,
  LOGIN_ERROR,
  LOGIN_HEADER,
  LOGIN_TITLE,
} from '../../assets/content';
import { getUserData } from '../home/ducks/thunks';

const { Paragraph } = Typography;

const LoginPageContainer = styled.div`
  margin: auto;
  width: 80vw;
`;

const TabletLoginPageContainer = styled.div`
  padding: 90px 60px;
`;

const MobileLoginPageContainer = styled.div`
  padding: 30px;
`;

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const RightMargin = styled.div`
  margin-right: 30px;
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

const Footer = styled(Paragraph)`
  color: ${TEXT_GREY};
  line-height: 1.5;
  margin-top: 40px;
  margin-bottom: 10px;
`;

const Title = styled(Paragraph)`
  color: ${BLACK};
  font-size: 30px;
  line-height: 36px;
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

type LoginProps = UserAuthenticationReducerState;

const Login: React.FC<LoginProps> = ({ tokens }) => {
  const { windowType } = useWindowDimensions();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<RedirectStateProps>();
  const privilegeLevel = useSelector((state: C4CState) =>
    getPrivilegeLevel(state.authenticationState.tokens),
  );

  const destination: Routes = location.state
    ? location.state.destination
    : Routes.HOME;

  if (privilegeLevel !== PrivilegeLevel.NONE) {
    dispatch(getUserData());
    history.push(destination);
  }

  const loginFailed: boolean = tokens.kind === AsyncRequestKinds.Failed;

  const onFinish = (values: LoginRequest) => {
    dispatch(login({ email: values.email, password: values.password }));
  };

  const ForgotPasswordFooter = (
    <div>
      <Paragraph>
        <Link to={Routes.FORGOT_PASSWORD_REQUEST}>FORGOT PASSWORD?</Link>
      </Paragraph>

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
                <LoginForm onFinish={onFinish} />
                {ForgotPasswordFooter}
              </MobileLoginPageContainer>
            );
          case WindowTypes.Tablet:
            return (
              <TabletLoginPageContainer>
                <CenterDiv>
                  <RightMargin>
                    <InputContainer>
                      <Title>{LOGIN_TITLE}</Title>
                      <Line />
                      {loginFailed && (
                        <LoginAlert message={LOGIN_ERROR} type="error" />
                      )}
                      <LoginForm onFinish={onFinish} />
                      {ForgotPasswordFooter}
                    </InputContainer>
                  </RightMargin>

                  <GreetingContainer header={LOGIN_HEADER} body={LOGIN_BODY} />
                </CenterDiv>
              </TabletLoginPageContainer>
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
                      <LoginForm onFinish={onFinish} />
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
  };
};

export default connect(mapStateToProps)(Login);
