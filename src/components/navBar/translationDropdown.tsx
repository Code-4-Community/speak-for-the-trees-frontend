import React from 'react';
import { Dropdown, MenuProps } from 'antd';
import i18n from 'i18next';

const items: MenuProps['items'] = [
  {
    key: 'en',
    label: 'English',
  },
  {
    key: 'es',
    label: 'Español',
  },
];

const triggerChangeLang: MenuProps['onClick'] = ({ key }) => {
  i18n.changeLanguage(key);
};

const TranslationDropdown: React.FC = () => {
  return (
    <Dropdown menu={{ items, onClick: triggerChangeLang }}>
      <p>Languages</p>
    </Dropdown>
  );
};

export default TranslationDropdown;
