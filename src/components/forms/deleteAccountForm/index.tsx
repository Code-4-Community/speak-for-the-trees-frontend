import React from 'react';
import { useHistory } from 'react-router-dom';
import { message, Form, Input } from 'antd';
import ProtectedApiClient from '../../../api/protectedApiClient';
import { loginPasswordRules } from '../../../utils/formRules';
import { AuthRequest } from '../ducks/types';
import { LOCALSTORAGE_STATE_KEY } from '../../../store';
import { SubmitButton } from '../../themedComponents';
import { useTranslation } from 'react-i18next';
import { n } from '../../../utils/stringFormat';
import { site } from '../../../constants';

const DeleteAccountForm: React.FC = () => {
  const { t } = useTranslation(n(site, ['forms']), { nsMode: 'fallback' });

  const history = useHistory();

  const onFinishDeleteUser = (value: AuthRequest) => {
    ProtectedApiClient.deleteUser(value)
      .then(() => {
        localStorage.removeItem(LOCALSTORAGE_STATE_KEY);
        history.go(0);
      })
      .catch((err) =>
        message.error(t('delete_account.error', { error: err.response.data })),
      );
  };

  return (
    <Form name="deleteAccount" onFinish={onFinishDeleteUser}>
      <Form.Item name="password" rules={loginPasswordRules}>
        <Input.Password placeholder={t('password')} />
      </Form.Item>
      <Form.Item>
        <SubmitButton type="primary" htmlType="submit" danger>
          {t('delete_account.submit')}
        </SubmitButton>
      </Form.Item>
    </Form>
  );
};

export default DeleteAccountForm;
