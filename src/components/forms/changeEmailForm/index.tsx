import React from 'react';
import { useDispatch } from 'react-redux';
import { message, Form, Input } from 'antd';
import ProtectedApiClient from '../../../api/protectedApiClient';
import { enterEmailRules, loginPasswordRules } from '../../../utils/formRules';
import { ChangeEmailRequest } from '../ducks/types';
import { SubmitButton } from '../../themedComponents';
import { getUserData } from '../../../auth/ducks/thunks';

interface ChangeEmailFormProps {
  readonly formLayout: { wrapperCol: { span: number } };
}

const ChangeEmailForm: React.FC<ChangeEmailFormProps> = ({ formLayout }) => {
  const [changeEmailForm] = Form.useForm();
  const dispatch = useDispatch();

  const onFinishChangeEmail = (values: ChangeEmailRequest) => {
    ProtectedApiClient.changeEmail(values)
      .then(() => {
        message.success('Email changed!');
        changeEmailForm.resetFields();
        dispatch(getUserData());
      })
      .catch((err) =>
        message.error(`Email could not be changed: ${err.response.data}`),
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
        <Input placeholder="New Email Address" />
      </Form.Item>
      <Form.Item name="password" rules={loginPasswordRules}>
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <SubmitButton type="primary" htmlType="submit">
          Save
        </SubmitButton>
      </Form.Item>
    </Form>
  );
};

export default ChangeEmailForm;
