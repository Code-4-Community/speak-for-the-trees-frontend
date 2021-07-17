import React from 'react';
import { useHistory } from 'react-router-dom';
import { message, Form, Input } from 'antd';
import ProtectedApiClient from '../../../api/protectedApiClient';
import { loginPasswordRules } from '../../../utils/formRules';
import { AuthRequest } from '../ducks/types';
import { LOCALSTORAGE_STATE_KEY } from '../../../store';
import { SubmitButton } from '../../themedComponents';

const DeleteAccountForm: React.FC = () => {
  const history = useHistory();

  const onFinishDeleteUser = (value: AuthRequest) => {
    ProtectedApiClient.deleteUser(value)
      .then(() => {
        localStorage.removeItem(LOCALSTORAGE_STATE_KEY);
        history.go(0);
      })
      .catch((err) =>
        message.error(`Could not delete user: ${err.response.data}`),
      );
  };

  return (
    <Form name="deleteAccount" onFinish={onFinishDeleteUser}>
      <Form.Item name="password" rules={loginPasswordRules}>
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <SubmitButton type="primary" htmlType="submit" danger>
          Delete Account
        </SubmitButton>
      </Form.Item>
    </Form>
  );
};

export default DeleteAccountForm;
