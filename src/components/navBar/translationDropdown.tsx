import React from 'react';
import { Dropdown, MenuProps } from 'antd';
import i18n from 'i18next';
import { GlobalOutlined } from '@ant-design/icons';
import { LOCALSTORAGE_I18N_KEY } from '../../i18n/i18n';
import styled from 'styled-components';
import { languages } from '../../i18n/i18n';

// Convert language codes to items whose display is the language name
const items: MenuProps['items'] = languages.map((langCode) => {
  const languageName =
    new Intl.DisplayNames(langCode, { type: 'language' }).of(langCode) || '';
  return {
    key: langCode,
    label: languageName[0].toUpperCase() + languageName.slice(1),
  };
});

const triggerChangeLang: MenuProps['onClick'] = ({ key }) => {
  i18n.changeLanguage(key);
  localStorage.setItem(LOCALSTORAGE_I18N_KEY, key);
};

const TranslationGlobal = styled(GlobalOutlined)`
  font-size: 25px;
`;

const TranslationDropdown: React.FC = () => {
  return (
    <Dropdown
      menu={{ items, onClick: triggerChangeLang }}
      placement="bottomRight"
    >
      <TranslationGlobal />
    </Dropdown>
  );
};

export default TranslationDropdown;
