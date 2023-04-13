import OrderedList from '../orderedList';
import { Typography } from 'antd';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { CONTACT_EMAIL } from '../../assets/links';
import { n } from '../../utils/stringFormat';
import { site } from '../../constants';

export const LandingContent: React.FC = () => {
  const { t } = useTranslation(n(site, 'landing'), { nsMode: 'fallback' });

  const questionsDirections: JSX.Element[] = t<string, string[]>(
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
          >
            {' '}
          </a>
        ),
        contactUsLink: (
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            target={'_blank'}
            rel={'noopener noreferrer'}
          >
            {' '}
          </a>
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
        ns={n(site, 'landing')}
        i18nKey="sidebar.body.learnMore"
        components={{
          adoptLink: (
            <a
              href={'https://treeboston.org/get-involved/adopt/'}
              target={'_blank'}
              rel={'noopener noreferrer'}
            >
              {' '}
            </a>
          ),
        }}
      />
      <br />
      <br />
      {t('sidebar.questionDirections.questions')}
      <OrderedList items={questionsDirections} />

      <Typography.Title level={3}>
        {t('adoptionDirections.header')}
      </Typography.Title>
      <OrderedList items={adoptionDirections} />
    </>
  );
};

export default LandingContent;
