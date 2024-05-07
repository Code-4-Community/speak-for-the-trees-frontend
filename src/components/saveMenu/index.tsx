import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Button, Typography, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { site } from '../../constants';
import { n } from '../../utils/stringFormat';
import { AddTemplateRequest } from '../forms/ducks/types';
import ProtectedApiClient from '../../api/protectedApiClient';

const ShareMenuContainer = styled.div`
  max-width: 550px;
  margin: 20px 0px;
`;

const MediaShareButton = styled(Button)`
  margin-top: 10px;
  margin-right: 10px;
  width: 60px;

  &:hover {
    background-color: #e7ffc7;
  }
`;

const StyledImg = styled.img`
  max-height: 25px;
  margin-bottom: 3px;
`;

interface SaveMenuProps {
  template: string;
}

const SaveMenu: React.FC<SaveMenuProps> = ({ template }) => {
  const { t } = useTranslation(n(site, ['shareMenu']), { nsMode: 'fallback' });

  const [templateName, setTemplateName] = useState(``);

  const onClickSave = (name: string, body: string) => {
    const addTemplateRequest: AddTemplateRequest = {
      name,
      body,
    };
    ProtectedApiClient.addTemplate(addTemplateRequest)
      .then(() => {
        message.success(t('success'));
      })
      .catch((err) =>
        message.error(t('response_error', { error: err.response.data })),
      );
  };
  return (
    <ShareMenuContainer>
      <Typography.Title level={4}>{t('title')}</Typography.Title>
      <Input
        defaultValue={templateName}
        value={templateName}
        onChange={(e) => setTemplateName(e.target.value)}
      />
      <MediaShareButton
        name="email-button"
        onClick={() => onClickSave(templateName, template)}
      ></MediaShareButton>
    </ShareMenuContainer>
  );
};

export default SaveMenu;
