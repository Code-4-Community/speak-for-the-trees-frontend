import React, { useState } from 'react';
import styled from 'styled-components';
import { Collapse, Form, Input, Switch, UploadProps, message } from 'antd';
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
import templateContent from './content';
import Dragger from 'antd/lib/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import { LIGHT_GREEN } from '../../../utils/colors';
import { RcFile } from 'antd/lib/upload';

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

function readAndPreview(f: RcFile): Promise<[string, string]> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener(
      'loadend',
      () => {
        resolve([f.name, reader.result as string]);
      },
      false,
    );
    reader.readAsDataURL(f);
  });
}

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
  const [showSave, setShowSave] = useState(false);
  const [sanitizedBodyContent, setSanitizedBodyContent] = useState<string>('');
  const [attachments, setAttachments] = useState<Record<string, string>>({});

  const togglePreview = (isShowPreview: boolean) => {
    setShowPreview(isShowPreview);
    if (isShowPreview)
      setSanitizedBodyContent(
        DOMPurify.sanitize(sendEmailForm.getFieldValue('emailBody')),
      );
  };

  const onFinishSendEmail = (values: SendEmailFormValues) => {
    if (emails.length === 0) {
      message.error(t('users_required'));
      return;
    }

    const attachmentData = Object.entries(attachments).map(([name, data]) => {
      return { name, data };
    });

    const sendEmailRequest: SendEmailRequest = {
      emailSubject: values.emailSubject,
      emailBody: DOMPurify.sanitize(values.emailBody),
      emails,
      attachments: attachmentData,
    };
    ProtectedApiClient.sendEmail(sendEmailRequest)
      .then(() => {
        message.success(t('success'));
      })
      .catch((err) =>
        message.error(t('response_error', { error: err.response.data })),
      );
  };

  const attachmentFormProps: UploadProps = {
    name: 'file',
    multiple: true,
    beforeUpload: (_, fileList) => {
      if (fileList.length === 0) {
        return false;
      }

      const uploadPromises = fileList.map((f) => readAndPreview(f));
      Promise.all(uploadPromises).then((uploadedAttachments) => {
        setAttachments({
          ...attachments,
          ...Object.fromEntries(uploadedAttachments),
        });
      });

      return false;
    },
    onRemove(file) {
      const attachmentsCopy = attachments;
      delete attachmentsCopy[file.name];

      setAttachments(attachmentsCopy);
    },
  };

  return (
    <Form name="sendEmail" form={sendEmailForm} onFinish={onFinishSendEmail}>
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
          dangerouslySetInnerHTML={{
            __html: templateContent(sanitizedBodyContent),
          }}
        />
      )}
      <Collapse ghost style={{ maxWidth: '600px' }}>
        <Collapse.Panel header={t('upload_collapse_title')} key="attachments">
          <Dragger {...attachmentFormProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined style={{ color: LIGHT_GREEN }} />
            </p>
            <p className="ant-upload-text">{t('upload_header')}</p>
            <p className="ant-upload-hint">{t('upload_description')}</p>
          </Dragger>
        </Collapse.Panel>
      </Collapse>
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
        {showSave && (
          <SaveMenu
            templateBody={sendEmailForm.getFieldValue('emailBody')}
          ></SaveMenu>
        )}
      </EmailFlex>
    </Form>
  );
};

export default SendEmailForm;
