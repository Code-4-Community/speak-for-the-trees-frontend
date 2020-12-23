import React from 'react';
import { Col, Row, Typography } from 'antd';
import { Helmet } from 'react-helmet';
import GreetingContainer from '../../components/greeting-container/GreetingContainer';
import { signup } from '../../auth/ducks/thunks';
import { connect, useDispatch } from 'react-redux';
import { UserAuthenticationReducerState } from '../../auth/ducks/types';
import { C4CState } from '../../store';
import { WHITE, BLACK, LIGHT_GREY } from '../../colors';
import styled from 'styled-components';
import MobilePageHeader from '../../components/mobile-pageheader/MobilePageHeader';
import SignupForm from '../../components/signup-form/SignupForm';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/window-dimensions';

const { Title } = Typography;

const SignupContainer = styled.div`
  padding: 8%;
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
  margin: 5% -20px 7% -50px;
  background: ${WHITE};
`;

type SignupProps = UserAuthenticationReducerState;

const Signup: React.FC<SignupProps> = ({ tokens }) => {
  const { windowType, width } = useWindowDimensions();
  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    dispatch(
      signup({
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      }),
    );
  };

  const greetingHeader = 'Welcome Back!';

  if (windowType === WindowTypes.Mobile) {
    return (
      <>
        <Helmet>
          <title>Sign Up</title>
          <meta name="description" content="Description goes here." />
        </Helmet>
        <SignupContainer>
          <MobilePageHeader pageTitle="Sign Up" />
          <SignupForm onFinish={onFinish} />
        </SignupContainer>
      </>
    );
  }
  return (
    <>
      <Helmet>
        <title>Sign Up</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <SignupContainer>
        <Row>
          <InputContainer span={10}>
            <Title level={2} style={{ color: BLACK }}>
              Sign Up
            </Title>
            <Line />
            <SignupForm onFinish={onFinish} />
          </InputContainer>

          <Col span={`${width < 715 ? 1 : 2}`}></Col>

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
      </SignupContainer>
    </>
  );
};

const mapStateToProps = (state: C4CState): SignupProps => {
  return {
    tokens: state.authenticationState.tokens,
  };
};

export default connect(mapStateToProps)(Signup);
