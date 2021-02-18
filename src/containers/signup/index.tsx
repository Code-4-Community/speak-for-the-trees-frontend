import React from 'react';
import { useHistory } from 'react-router-dom';
import { Alert, Col, Row, Typography } from 'antd';
import { Helmet } from 'react-helmet';
import GreetingContainer from '../../components/greeting-container/GreetingContainer';
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
import MobilePageHeader from '../../components/mobile-pageheader/MobilePageHeader';
import SignupForm from '../../components/signup-form/SignupForm';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/window-dimensions';
import { AsyncRequestKinds } from '../../utils/asyncRequest';
import { Routes } from '../../App';
import { getPrivilegeLevel } from '../../auth/ducks/selectors';

const { Title } = Typography;

const containerHeight = '525px';
const greetingHeader = 'Welcome Back!';
const greetingBody =
  'Dreamcatcher kogi taiyaki keytar. Swag typewriter craft beer\n' +
  'cronut pok pok gentrify flannel salvia deep v pork belly\n' +
  'pitchfork. Swag fashion axe fam. Occupy biodiesel jean shorts\n' +
  'affogato PBR&B freegan bushwick vegan four loko pickled.';

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
      <div>
        {(() => {
          switch (windowType) {
            case WindowTypes.Mobile:
              return (
                <>
                  <MobileSignupPageContainer>
                    <MobilePageHeader pageTitle="Sign Up" />
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
                          <Title level={2} style={{ color: BLACK }}>
                            Sign Up
                          </Title>
                          <Line />
                          <SignupForm onFinish={onFinish} />
                        </InputContainer>
                      </RightMargin>

                      <GreetingContainer
                        header={greetingHeader}
                        body={greetingBody}
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
                        <Title level={2} style={{ color: BLACK }}>
                          Sign Up
                        </Title>
                        <Line />
                        <SignupForm onFinish={onFinish} />
                      </InputContainer>

                      <Col span={2} />

                      <Col span={12}>
                        <GreetingContainer
                          header={greetingHeader}
                          body={greetingBody}
                          height={containerHeight}
                        />
                      </Col>
                    </Row>
                  </SignupPageContainer>
                </>
              );
          }
        })()}
      </div>
    </>
  );
};

const mapStateToProps = (state: C4CState): SignupProps => {
  return {
    tokens: state.authenticationState.tokens,
  };
};

export default connect(mapStateToProps)(Signup);
