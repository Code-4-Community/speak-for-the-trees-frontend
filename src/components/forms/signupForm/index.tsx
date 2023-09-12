import React, { PropsWithChildren } from 'react';
import Form from 'antd/es/form';
import type { FormInstance } from 'antd/es/form';
import Input from 'antd/es/input';
import {
  FormHalfItem,
  FormRow,
  FullWidthSpace,
  Gap,
} from '../../themedComponents';
import {
  confirmPasswordRules,
  enterEmailRules,
  firstNameRules,
  lastNameRules,
  newPasswordRules,
  usernameRules,
} from '../../../utils/formRules';
import { SignupFormValues } from '../ducks/types';
import { useTranslation } from 'react-i18next';
import { n } from '../../../utils/stringFormat';
import { site } from '../../../constants';

interface SignupFormProps {
  readonly formInstance: FormInstance;
  readonly onFinish: (values: SignupFormValues) => void;
}

const SignupForm: React.FC<PropsWithChildren<SignupFormProps>> = ({
  formInstance,
  onFinish,
  children,
}) => {
  const { t } = useTranslation(n(site, ['forms']), { nsMode: 'fallback' });

  return (
    <>
      <Form name="basic" form={formInstance} onFinish={onFinish}>
        <FullWidthSpace direction="vertical" size={1}>
          <FormRow>
            <FormHalfItem name="firstName" rules={firstNameRules}>
              <Input placeholder={t('first_name')} />
            </FormHalfItem>
            <Gap />
            <FormHalfItem name="lastName" rules={lastNameRules}>
              <Input placeholder={t('last_name')} />
            </FormHalfItem>
          </FormRow>
          <Form.Item name="username" rules={usernameRules}>
            <Input placeholder={t('username')} />
          </Form.Item>
          <Form.Item name="email" rules={enterEmailRules}>
            <Input placeholder={t('email')} />
          </Form.Item>
          <Form.Item name="password" rules={newPasswordRules}>
            <Input.Password placeholder={t('password')} />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={confirmPasswordRules(formInstance, 'password')}
          >
            <Input.Password
              placeholder={t('reset_password.confirm_password')}
            />
          </Form.Item>
        </FullWidthSpace>
        <div>{children}</div>
      </Form>
    </>
  );
};

export default SignupForm;
