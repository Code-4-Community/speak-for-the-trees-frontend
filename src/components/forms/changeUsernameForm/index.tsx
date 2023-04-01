import React from 'react';
import { message, Form, Input } from 'antd';
import ProtectedApiClient from '../../../api/protectedApiClient';
import { loginPasswordRules, usernameRules } from '../../../utils/formRules';
import { ChangeUsernameRequest } from '../ducks/types';
import { SubmitButton } from '../../themedComponents';
import { useTranslation } from 'react-i18next';
import { n } from '../../../utils/stringFormat';
import { site } from '../../../App';

interface ChangeUsernameFormProps {
  readonly formLayout: { wrapperCol: { span: number } };
}

const ChangeUsernameForm: React.FC<ChangeUsernameFormProps> = ({
  formLayout,
}) => {
  const { t } = useTranslation(n(site, ['forms']), { nsMode: 'fallback' });

  const [changeUsernameForm] = Form.useForm();

  const onFinishChangeUsername = (values: ChangeUsernameRequest) => {
    ProtectedApiClient.changeUsername(values)
      .then(() => {
        message.success(t('change_username.success'));
        changeUsernameForm.resetFields();
      })
      .catch((err) =>
        message.error(t('change_username.error', { error: err.response.data })),
      );
  };

  return (
    <Form
      name="changeUsername"
      form={changeUsernameForm}
      onFinish={onFinishChangeUsername}
      {...formLayout}
    >
      <Form.Item name="newUsername" rules={usernameRules}>
        <Input placeholder={t('username')} />
      </Form.Item>
      <Form.Item name="password" rules={loginPasswordRules}>
        <Input.Password placeholder={t('password')} />
      </Form.Item>
      <SubmitButton type="primary" htmlType="submit">
        {t('save')}
      </SubmitButton>
    </Form>
  );
};

export default ChangeUsernameForm;
