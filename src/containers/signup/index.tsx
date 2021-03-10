import React from 'react';
import { useHistory } from 'react-router-dom';
import { Alert, Col, Row, Typography } from 'antd';
import { Helmet } from 'react-helmet';
import GreetingContainer from '../../components/greetingContainer';
import { signup } from '../../auth/ducks/thunks';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
  PrivilegeLevel,
  SignupRequest,
  UserAuthenticationReducerState,
} from '../../auth/ducks/types';
import { C4CState } from '../../store';
import { BLACK, LIGHT_GREY, WHITE } from '../../utils/colors';
import styled from 'styled-components';
import MobilePageHeader from '../../components/mobileComponents/mobilePageHeader';
import SignupForm from '../../components/signupForm';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/window-dimensions';
import { AsyncRequestKinds } from '../../utils/asyncRequest';
import { Routes } from '../../App';
import { getPrivilegeLevel } from '../../auth/ducks/selectors';
import { SIGNUP_BODY, SIGNUP_HEADER, SIGNUP_TITLE } from '../../assets/content';

const { Paragraph } = Typography;

const containerHeight = '525px';

const SignupPageContainer = styled.div`
  padding: 120px;
`;

const TabletSignupPageContainer = styled.div`
  padding: 90px 60px;
`;

const MobileSignupPageContainer = styled.div`
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
  height: ${containerHeight};
  min-width: 275px;
  padding: 30px 20px 20px 50px;
  background: ${LIGHT_GREY};
  box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.09);
  border-radius: 6px;
`;

const Line = styled.div`
  height: 2px;
  margin: 10px -20px 25px -50px;
  background: ${WHITE};
`;

const Title = styled(Paragraph)`
  color: ${BLACK};
  font-size: 30px;
  line-height: 36px;
`;

const SignupAlert = styled(Alert)`
  margin-top: -40px;
  margin-bottom: 20px;
`;

const MobileSignupAlert = styled(Alert)`
  margin-bottom: 20px;
`;

type SignupProps = UserAuthenticationReducerState;

const Signup: React.FC<SignupProps> = ({ tokens }) => {
  const { windowType } = useWindowDimensions();
  const dispatch = useDispatch();
  const history = useHistory();
  const privilegeLevel = useSelector((state: C4CState) =>
    getPrivilegeLevel(state.authenticationState.tokens),
  );

  if (privilegeLevel !== PrivilegeLevel.NONE) {
    history.push(Routes.HOME);
  }

  const onFinish = (values: SignupRequest) => {
    dispatch(
      signup({
        email: values.email,
        username: values.username,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      }),
    );
  };

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
        <meta name="signup" content="Where the user can create a new account" />
      </Helmet>
      {(() => {
        switch (windowType) {
          case WindowTypes.Mobile:
            return (
              <>
                <MobileSignupPageContainer>
                  <MobilePageHeader pageTitle={SIGNUP_TITLE} />
                  {tokens.kind === AsyncRequestKinds.Failed && (
                    <MobileSignupAlert message={tokens.error} type="error" />
                  )}
                  <SignupForm onFinish={onFinish} />
                </MobileSignupPageContainer>
              </>
            );
          case WindowTypes.Tablet:
            return (
              <>
                <TabletSignupPageContainer>
                  {tokens.kind === AsyncRequestKinds.Failed && (
                    <SignupAlert message={tokens.error} type="error" />
                  )}
                  <CenterDiv>
                    <RightMargin>
                      <InputContainer>
                        <Title>{SIGNUP_TITLE}</Title>
                        <Line />
                        <SignupForm onFinish={onFinish} />
                      </InputContainer>
                    </RightMargin>

                    <GreetingContainer
                      header={SIGNUP_HEADER}
                      body={SIGNUP_BODY}
                      height={containerHeight}
                    />
                  </CenterDiv>
                </TabletSignupPageContainer>
              </>
            );
          case WindowTypes.NarrowDesktop:
          case WindowTypes.Desktop:
            return (
              <>
                <SignupPageContainer>
                  {tokens.kind === AsyncRequestKinds.Failed && (
                    <SignupAlert message={tokens.error} type="error" />
                  )}
                  <Row>
                    <InputContainer span={10}>
                      <Title>{SIGNUP_TITLE}</Title>
                      <Line />
                      <SignupForm onFinish={onFinish} />
                    </InputContainer>

                    <Col span={2} />

                    <Col span={12}>
                      <GreetingContainer
                        header={SIGNUP_HEADER}
                        body={SIGNUP_BODY}
                        height={containerHeight}
                      />
                    </Col>
                  </Row>
                </SignupPageContainer>
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
