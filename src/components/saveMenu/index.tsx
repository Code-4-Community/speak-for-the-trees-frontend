import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Button, Typography, message } from 'antd';
import EmailIcon from '../../assets/images/email-icon.png';
import { useTranslation } from 'react-i18next';
import { site } from '../../constants';
import { n } from '../../utils/stringFormat';
import { AddTemplateRequest } from '../forms/ducks/types';
import ProtectedApiClient from '../../api/protectedApiClient';

const SaveMenuContainer = styled.div`
  max-width: 200px;
  margin: 20px 0px;
`;

const StyledImg = styled.img`
  max-height: 25px;
  margin-bottom: 3px;
`;

const MediaShareButton = styled(Button)`
  margin-top: 10px;
  margin-right: 10px;
  width: 60px;

  &:hover {
    background-color: #e7ffc7;
  }
`;

interface SaveMenuProps {
  templateBody: string;
}

const SaveMenu: React.FC<SaveMenuProps> = ({ templateBody }) => {
  const { t } = useTranslation(n(site, ['shareMenu']), { nsMode: 'fallback' });

  const [templateName, setTemplateName] = useState(``);

  const onClickSave = (name: string, template: string) => {
    const addTemplateRequest: AddTemplateRequest = {
      name,
      template,
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
    <SaveMenuContainer>
      <Typography.Title level={4}>{t('title')}</Typography.Title>
      <Input
        defaultValue={templateName}
        value={templateName}
        onChange={(e) => setTemplateName(e.target.value)}
      />
      <MediaShareButton
        name="email-button"
        onClick={() => onClickSave(templateName, templateBody)}
      >
        <StyledImg src={EmailIcon} alt={t('alt.email')} />
      </MediaShareButton>
    </SaveMenuContainer>
  );
};

export default SaveMenu;
