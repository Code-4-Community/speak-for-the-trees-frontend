import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { Form, Input, Switch, message } from 'antd';
import { SubmitButton } from '../../../components/themedComponents';
import ProtectedApiClient from '../../../api/protectedApiClient';
import {
  SendEmailFormValues,
  SendEmailRequest,
} from '../../../components/forms/ducks/types';
import { requiredRule } from '../../../utils/formRules';
import DOMPurify from 'isomorphic-dompurify';

const PreviewSwitch = styled(Switch)`
  display: flex;
  align-items: center;
  // min-width: 80px;
  margin-bottom: 10px;
  padding: 10px 5px;
`;

const EmailPreview = styled.div`
  min-height: 200px;
  margin-bottom: 24px;
  max-height: 400px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 3px 11px;
`;

interface SendEmailFormProps {
  readonly emails: string[];
}

const SendEmailForm: React.FC<SendEmailFormProps> = ({ emails }) => {
  const [sendEmailForm] = Form.useForm();

  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [bodyContent, setBodyContent] = useState<string>('');
  const sanitizedBodyContent = useMemo(
    () => DOMPurify.sanitize(bodyContent),
    [bodyContent],
  );

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
      onValuesChange={(changedValues, _) => {
        changedValues['emailBody'] &&
          setBodyContent(changedValues['emailBody']);
      }}
    >
      <Form.Item
        name="emailSubject"
        rules={requiredRule('The email subject is required')}
      >
        <Input placeholder="Email Subject" />
      </Form.Item>
      <PreviewSwitch
        onChange={(checked) => setShowPreview(checked)}
        checkedChildren="Preview"
        unCheckedChildren="Raw"
      />
      {showPreview ? (
        <EmailPreview
          dangerouslySetInnerHTML={{ __html: sanitizedBodyContent }}
        />
      ) : (
        <Form.Item
          name="emailBody"
          rules={requiredRule('The email body is required')}
        >
          <Input.TextArea rows={6} placeholder="Email Body" />
        </Form.Item>
      )}
      <SubmitButton type="primary" htmlType="submit">
        Send Email
      </SubmitButton>
    </Form>
  );
};

export default SendEmailForm;
