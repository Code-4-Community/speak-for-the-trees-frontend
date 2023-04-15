import React from 'react';
import { message, Form, Input } from 'antd';
import ProtectedApiClient from '../../../api/protectedApiClient';
import {
  confirmPasswordRules,
  loginPasswordRules,
  newPasswordRules,
} from '../../../utils/formRules';
import { ChangePasswordFormValues } from '../ducks/types';
import { SubmitButton } from '../../themedComponents';
import { site } from '../../../constants';
import { useTranslation } from 'react-i18next';
import { n } from '../../../utils/stringFormat';

interface ChangePasswordFormProps {
  readonly formLayout: { wrapperCol: { span: number } };
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  formLayout,
}) => {
  const { t } = useTranslation(n(site, ['forms']), { nsMode: 'fallback' });

  const [changePasswordForm] = Form.useForm();

  const onFinishChangePassword = (values: ChangePasswordFormValues) => {
    ProtectedApiClient.changePassword({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    })
      .then(() => {
        message.success(t('change_password.success'));
        changePasswordForm.resetFields();
      })
      .catch((err) =>
        message.error(t('change_password.error', { error: err.response.data })),
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
        <Input.Password placeholder={t('current_password')} />
      </Form.Item>
      <Form.Item
        name="newPassword"
        help={t('validation.password_new_min_length')}
        rules={newPasswordRules}
      >
        <Input.Password placeholder={t('reset_password.new_password')} />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        dependencies={['newPassword']}
        rules={confirmPasswordRules(changePasswordForm, 'newPassword')}
      >
        <Input.Password placeholder={t('reset_password.confirm_password')} />
      </Form.Item>
      <Form.Item>
        <SubmitButton type="primary" htmlType="submit">
          {t('save')}
        </SubmitButton>
      </Form.Item>
    </Form>
  );
};

export default ChangePasswordForm;
