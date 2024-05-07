import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Button, Typography, message } from 'antd';
import { SaveTwoTone } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { site } from '../../constants';
import { n } from '../../utils/stringFormat';
import { AddTemplateRequest } from '../forms/ducks/types';
import ProtectedApiClient from '../../api/protectedApiClient';
import { LIGHT_GREEN } from '../../utils/colors';

const SaveMenuContainer = styled.div`
  max-width: 200px;
  margin: 20px 0px;
`;

const MediaShareButton = styled(Button)`
  margin-left: 10px;
  width: 30px;

  &:hover {
    background-color: #e7ffc7;
  }
`;

interface SaveMenuProps {
  templateBody: string;
}

const SaveMenu: React.FC<SaveMenuProps> = ({ templateBody }) => {
  const { t } = useTranslation(n(site, ['forms']), {
    keyPrefix: 'volunteer_emailer',
    nsMode: 'fallback',
  });

  const [templateName, setTemplateName] = useState(``);

  const onClickSave = (name: string, template: string) => {
    //dom purify template
    //check name
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
      <Input
        defaultValue={templateName}
        value={templateName}
        onChange={(e) => setTemplateName(e.target.value)}
        placeholder={t('name_template')}
      />
      <MediaShareButton onClick={() => onClickSave(templateName, templateBody)}>
        <SaveTwoTone twoToneColor={LIGHT_GREEN} />
      </MediaShareButton>
    </SaveMenuContainer>
  );
};

export default SaveMenu;
