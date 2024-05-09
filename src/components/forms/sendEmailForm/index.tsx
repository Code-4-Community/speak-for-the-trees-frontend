import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Switch, message, Button } from 'antd';
import {
  Flex,
  SubmitButton,
  WhiteButton,
} from '../../../components/themedComponents';
import ProtectedApiClient from '../../../api/protectedApiClient';
import {
  SendEmailFormValues,
  SendEmailRequest,
} from '../../../components/forms/ducks/types';
import { requiredRule } from '../../../utils/formRules';
import { FormInstance } from 'antd/es/form';
import { site } from '../../../constants';
import { useTranslation } from 'react-i18next';
import { n } from '../../../utils/stringFormat';
import DOMPurify from 'isomorphic-dompurify';
import SaveMenu from '../../saveMenu';

const PreviewSwitch = styled(Switch)`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px 5px;
`;

const EmailPreview = styled.div`
  min-height: 250px;
  margin-bottom: 24px;
  max-height: 800px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 3px 11px;
  resize: vertical;
  overflow-y: scroll; // required for resizing
`;

const WhiteSaveButton = styled(WhiteButton)`
  height: 40px;
`;

const EmailFlex = styled(Flex)`
  gap: 4px;
`;

interface SendEmailFormProps {
  readonly emails: string[];
  readonly sendEmailForm: FormInstance<SendEmailRequest>;
}

const SendEmailForm: React.FC<SendEmailFormProps> = ({
  emails,
  sendEmailForm,
}) => {
  const { t } = useTranslation(n(site, ['forms']), {
    keyPrefix: 'volunteer_emailer',
    nsMode: 'fallback',
  });

  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [bodyContent, setBodyContent] = useState<string>('');
  const [showSave, setShowSave] = useState(false);
  const [sanitizedBodyContent, setSanitizedBodyContent] = useState<string>('');

  const togglePreview = (isShowPreview: boolean) => {
    setShowPreview(isShowPreview);
    if (isShowPreview) setSanitizedBodyContent(DOMPurify.sanitize(bodyContent));
  };

  const onFinishSendEmail = (values: SendEmailFormValues) => {
    if (emails.length === 0) {
      message.error(t('users_required'));
      return;
    }

    const sendEmailRequest: SendEmailRequest = {
      ...values,
      emails,
    };
    ProtectedApiClient.sendEmail(sendEmailRequest)
      .then(() => {
        message.success(t('success'));
      })
      .catch((err) =>
        message.error(t('response_error', { error: err.response.data })),
      );
  };

  return (
    <Form
      name="sendEmail"
      form={sendEmailForm}
      onFinish={onFinishSendEmail}
      onValuesChange={(changedValues, _) => {
        if (changedValues.emailBody !== undefined)
          setBodyContent(changedValues.emailBody);
      }}
    >
      <Form.Item
        name="emailSubject"
        rules={requiredRule(t('subject_required'))}
      >
        <Input placeholder={t('subject_placeholder')} />
      </Form.Item>
      <PreviewSwitch
        onChange={togglePreview}
        checkedChildren={t('preview.preview')}
        unCheckedChildren={t('preview.raw')}
      />
      <Form.Item
        name="emailBody"
        rules={requiredRule(t('body_required'))}
        hidden={showPreview}
      >
        <Input.TextArea
          name="emailContent"
          rows={8}
          placeholder={t('body_placeholder')}
        />
      </Form.Item>
      {showPreview && (
        <EmailPreview
          dangerouslySetInnerHTML={{ __html: sanitizedBodyContent }}
        />
      )}
      <EmailFlex>
        <SubmitButton type="primary" htmlType="submit">
          {t('send')}
        </SubmitButton>
        <WhiteSaveButton
          type="text"
          size="large"
          onClick={() => {
            setShowSave(!showSave);
          }}
        >
          {t('save')}
        </WhiteSaveButton>
        {showSave && <SaveMenu templateBody={bodyContent}></SaveMenu>}
      </EmailFlex>
    </Form>
  );
};

export default SendEmailForm;
