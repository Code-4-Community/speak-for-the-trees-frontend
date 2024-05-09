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
import DOMPurify from 'isomorphic-dompurify';

const SaveMenuContainer = styled.div`
  display: flex;
  max-width: 400px;
  height: 40px;
  gap: 2px;
  align-self: end;
`;

const SaveButton = styled(Button)`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #e7ffc7;
  }
`;

const NameInput = styled(Input)`
  height: 40px;
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
    if (name.length === 0) {
      message.error(t('name_required'));
      return;
    }
    template = DOMPurify.sanitize(template);
    const addTemplateRequest: AddTemplateRequest = {
      name,
      template,
    };
    ProtectedApiClient.addTemplate(addTemplateRequest)
      .then(() => {
        message.success(t('save_success'));
      })
      .catch((err) =>
        message.error(t('response_error', { error: err.response.data })),
      );
  };
  return (
    <SaveMenuContainer>
      <NameInput
        defaultValue={templateName}
        value={templateName}
        onChange={(e) => setTemplateName(e.target.value)}
        placeholder={t('name_template')}
      />
      <SaveButton onClick={() => onClickSave(templateName, templateBody)}>
        <SaveTwoTone twoToneColor={LIGHT_GREEN} />
      </SaveButton>
    </SaveMenuContainer>
  );
};

export default SaveMenu;
