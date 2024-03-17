import React from 'react';
import { Dropdown, MenuProps } from 'antd';
import i18n from 'i18next';
import { GlobalOutlined } from '@ant-design/icons';
import { LOCALSTORAGE_I18N_KEY } from '../../i18n/i18n';
import styled from 'styled-components';

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
