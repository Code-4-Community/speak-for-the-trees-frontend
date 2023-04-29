import React from 'react';
import { Form, Input, message } from 'antd';
import { SubmitButton } from '../../../components/themedComponents';
import ProtectedApiClient from '../../../api/protectedApiClient';
import {
  SendEmailFormValues,
  SendEmailRequest,
} from '../../../components/forms/ducks/types';
import { requiredRule } from '../../../utils/formRules';

interface SendEmailFormProps {
  readonly emails: string[];
}

const SendEmailForm: React.FC<SendEmailFormProps> = ({ emails }) => {
  const [sendEmailForm] = Form.useForm();

  const onFinishSendEmail = (values: SendEmailFormValues) => {
    const sendEmailRequest: SendEmailRequest = {
      ...values,
      emails,
    };

    ProtectedApiClient.sendEmail(sendEmailRequest)
      .then(() => {
        message.success('Email sent!');
      })
      .catch((err) =>
        message.error(`Email could not be sent: ${err.response.data}`),
      );
  };

  return (
    <Form
      name="sendEmail"
      form={sendEmailForm}
      onFinish={onFinishSendEmail}
      disabled // TODO remove when ready
    >
      <Form.Item
        name="emailSubject"
        rules={requiredRule('The email subject is required')}
      >
        <Input placeholder="Email Subject" />
      </Form.Item>

      <Form.Item
        name="emailBody"
        rules={requiredRule('The email body is required')}
      >
        <Input.TextArea rows={6} placeholder="Email Body" />
      </Form.Item>

      <SubmitButton type="primary" htmlType="submit">
        Send Email
      </SubmitButton>
    </Form>
  );
};

export default SendEmailForm;
