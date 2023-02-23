import OrderedList from '../orderedList';
import { Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  QUESTIONS_DIRECTIONS,
  LANDING_BODY,
  ADOPTION_DIRECTIONS,
  ADOPTION_DIRECTIONS_HEADER,
} from '../../containers/landing/content';
import { Languages } from '../../App';

export const LandingContent: React.FC = () => {
  const { t } = useTranslation();
  const lang = Languages.ENGLISH;

  return (
    <>
      {LANDING_BODY[lang]}
      <OrderedList items={QUESTIONS_DIRECTIONS[lang]} />
      <Typography.Title level={3}>
        {ADOPTION_DIRECTIONS_HEADER[lang]}
      </Typography.Title>
      <OrderedList items={ADOPTION_DIRECTIONS[lang]} />
    </>
  );
};

export default LandingContent;
