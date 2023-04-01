import React from 'react';
import { useDispatch } from 'react-redux';
import { message, Form, Input } from 'antd';
import ProtectedApiClient from '../../../api/protectedApiClient';
import { enterEmailRules, loginPasswordRules } from '../../../utils/formRules';
import { ChangeEmailRequest } from '../ducks/types';
import { SubmitButton } from '../../themedComponents';
import { getUserData } from '../../../auth/ducks/thunks';
import { useTranslation } from 'react-i18next';
import { n } from '../../../utils/stringFormat';
import { site } from '../../../App';

interface ChangeEmailFormProps {
  readonly formLayout: { wrapperCol: { span: number } };
}

const ChangeEmailForm: React.FC<ChangeEmailFormProps> = ({ formLayout }) => {
  const { t } = useTranslation(n(site, ['forms']), { nsMode: 'fallback' });

  const [changeEmailForm] = Form.useForm();
  const dispatch = useDispatch();

  const onFinishChangeEmail = (values: ChangeEmailRequest) => {
    ProtectedApiClient.changeEmail(values)
      .then(() => {
        message.success(t('change_email.success'));
        changeEmailForm.resetFields();
        dispatch(getUserData());
      })
      .catch((err) =>
        message.error(t('change_email.error', { error: err.response.data })),
      );
  };

  return (
    <Form
      name="changeEmail"
      form={changeEmailForm}
      onFinish={onFinishChangeEmail}
      {...formLayout}
    >
      <Form.Item name="newEmail" rules={enterEmailRules}>
        <Input placeholder={t('change_email.new_email')} />
      </Form.Item>
      <Form.Item name="password" rules={loginPasswordRules}>
        <Input.Password placeholder={t('password')} />
      </Form.Item>
      <Form.Item>
        <SubmitButton type="primary" htmlType="submit">
          {t('save')}
        </SubmitButton>
      </Form.Item>
    </Form>
  );
};

export default ChangeEmailForm;
