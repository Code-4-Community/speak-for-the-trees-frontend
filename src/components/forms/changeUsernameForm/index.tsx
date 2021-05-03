import React from 'react';
import { message, Form, Input } from 'antd';
import ProtectedApiClient from '../../../api/protectedApiClient';
import { loginPasswordRules, usernameRules } from '../../../utils/formRules';
import { ChangeUsernameRequest } from '../ducks/types';
import { SubmitButton } from '../../themedComponents';

interface ChangeUsernameFormProps {
  readonly formLayout: { wrapperCol: { span: number } };
}

const ChangeUsernameForm: React.FC<ChangeUsernameFormProps> = ({
  formLayout,
}) => {
  const [changeUsernameForm] = Form.useForm();

  const onFinishChangeUsername = (values: ChangeUsernameRequest) => {
    ProtectedApiClient.changeUsername(values)
      .then(() => {
        message.success('Username changed!');
        changeUsernameForm.resetFields();
      })
      .catch((err) =>
        message.error(`Username could not be changed: ${err.response.data}`),
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
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item name="password" rules={loginPasswordRules}>
        <Input.Password placeholder="Password" />
      </Form.Item>
      <SubmitButton type="primary" htmlType="submit">
        Save
      </SubmitButton>
    </Form>
  );
};

export default ChangeUsernameForm;
