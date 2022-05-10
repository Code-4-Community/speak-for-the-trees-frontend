import React from 'react';
import { Form, Input } from 'antd';
import {
  FormHalfItem,
  FormRow,
  FullWidthSpace,
  Gap,
} from '../../themedComponents';
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

interface SignupFormProps {
  readonly formInstance: FormInstance;
  readonly onFinish: (values: SignupFormValues) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({
  formInstance,
  onFinish,
  children,
}) => {
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
        <div>{children}</div>
      </Form>
    </>
  );
};

export default SignupForm;
