import React from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../../../auth/ducks/thunks';
import { Routes } from '../../../App';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { ParagraphProps } from 'antd/lib/typography/Paragraph';
import { Link } from 'react-router-dom';
import { TEXT_GREY } from '../../../utils/colors';
import styled from 'styled-components';
import {
  FormHalfItem,
  FormRow,
  FullWidthSpace,
  Gap,
} from '../../themedComponents';
import { WindowTypes } from '../../windowDimensions';
import { FormInstance } from 'antd/es/form';
import {
  confirmPasswordRules,
  enterEmailRules,
  firstNameRules,
  lastNameRules,
  newPasswordRules,
  usernameRules,
} from '../../../utils/formRules';
import { SignupFormValues } from '../ducks/types';

const offsetSpan = 1;

const Footer: typeof Typography.Paragraph = styled(Typography.Paragraph)<
  ParagraphProps
>`
  color: ${TEXT_GREY};
  line-height: 1.5;
`;

interface SignupFormProps {
  readonly formInstance: FormInstance;
  readonly windowType: WindowTypes;
}

const SignupForm: React.FC<SignupFormProps> = ({
  formInstance,
  windowType,
}) => {
  const dispatch = useDispatch();

  const onFinish = (values: SignupFormValues) => {
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
      <Form name="basic" form={formInstance} onFinish={onFinish}>
        <FullWidthSpace direction="vertical" size={1}>
          <FormRow>
            <FormHalfItem name="firstName" rules={firstNameRules}>
              <Input placeholder="First Name" />
            </FormHalfItem>
            <Gap />
            <FormHalfItem name="lastName" rules={lastNameRules}>
              <Input placeholder="Last Name" />
            </FormHalfItem>
          </FormRow>
          <Form.Item name="username" rules={usernameRules}>
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item name="email" rules={enterEmailRules}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" rules={newPasswordRules}>
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={confirmPasswordRules(formInstance, 'password')}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
        </FullWidthSpace>
        <div>
          {(() => {
            switch (windowType) {
              case WindowTypes.Mobile:
                return (
                  <>
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
                  </>
                );
              case WindowTypes.Tablet:
              case WindowTypes.NarrowDesktop:
              case WindowTypes.Desktop:
                return (
                  <>
                    <Row>
                      <Col>
                        <Form.Item>
                          <Button type="primary" htmlType="submit" size="large">
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
                  </>
                );
            }
          })()}
        </div>
      </Form>
    </>
  );
};

export default SignupForm;
