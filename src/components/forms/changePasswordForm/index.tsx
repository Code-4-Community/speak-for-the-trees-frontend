import React from 'react';
import { message, Form, Input } from 'antd';
import ProtectedApiClient from '../../../api/protectedApiClient';
import {
  confirmPasswordRules,
  loginPasswordRules,
  newPasswordRules,
  passwordHelp,
} from '../../../utils/formRules';
import { ChangePasswordFormValues } from '../ducks/types';
import { SubmitButton } from '../../themedComponents';

interface ChangePasswordFormProps {
  readonly formLayout: { wrapperCol: { span: number } };
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  formLayout,
}) => {
  const [changePasswordForm] = Form.useForm();

  const onFinishChangePassword = (values: ChangePasswordFormValues) => {
    ProtectedApiClient.changePassword({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    })
      .then(() => {
        message.success('Password changed!');
        changePasswordForm.resetFields();
      })
      .catch((err) =>
        message.error(`Password could not be changed: ${err.response.data}`),
      );
  };

  return (
    <Form
      name="changePassword"
      form={changePasswordForm}
      onFinish={onFinishChangePassword}
      {...formLayout}
    >
      <Form.Item name="currentPassword" rules={loginPasswordRules}>
        <Input.Password placeholder="Current Password" />
      </Form.Item>
      <Form.Item
        name="newPassword"
        help={passwordHelp}
        rules={newPasswordRules}
      >
        <Input.Password placeholder="New Password" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        dependencies={['newPassword']}
        rules={confirmPasswordRules(changePasswordForm, 'newPassword')}
      >
        <Input.Password placeholder="Confirm Password" />
      </Form.Item>
      <Form.Item>
        <SubmitButton type="primary" htmlType="submit">
          Save
        </SubmitButton>
      </Form.Item>
    </Form>
  );
};

export default ChangePasswordForm;
