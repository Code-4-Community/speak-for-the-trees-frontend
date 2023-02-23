import OrderedList from '../orderedList';
import { Typography } from 'antd';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { CONTACT_EMAIL } from '../../assets/links';
import { n } from '../../utils/stringFormat';

export const LandingContent: React.FC = () => {
  const { t } = useTranslation(n('landing'), { nsMode: 'fallback' });

  const questions_directions: JSX.Element[] = t<string, string[]>(
    'sidebar.questionDirections.directions',
    {
      returnObjects: true,
    },
  ).map((key: string, index: number) => (
    <Trans
      i18nKey={key}
      components={{
        faqLink: (
          <a
            href={'https://map.treeboston.org/faq'}
            target={'_blank'}
            rel={'noopener noreferrer'}
          />
        ),
        contactUsLink: (
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            target={'_blank'}
            rel={'noopener noreferrer'}
          />
        ),
      }}
      key={index}
    />
  ));

  const adoptionDirections: string[] = t('adoptionDirections.body', {
    returnObjects: true,
  });

  return (
    <>
      {t('sidebar.body.introduction', { joinArrays: ' ' })}
      <br />
      <br />
      <Trans
        ns={'landing'}
        i18nKey="sidebar.body.learnMore"
        components={{
          adoptLink: (
            <a
              href={'https://treeboston.org/get-involved/adopt/'}
              target={'_blank'}
              rel={'noopener noreferrer'}
            />
          ),
        }}
      />
      <br />
      <br />
      {t('sidebar.questionDirections.questions')}
      <OrderedList items={questions_directions} />

      <Typography.Title level={3}>
        {t('adoptionDirections.header')}
      </Typography.Title>
      <OrderedList items={adoptionDirections} />
    </>
  );
};

export default LandingContent;
