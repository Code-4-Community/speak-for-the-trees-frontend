import React from 'react';
import { Helmet } from 'react-helmet';
import PageLayout from '../../components/pageLayout';
import PageHeader from '../../components/pageHeader';
import { PaddedPageContainer } from '../../components/themedComponents';
import { Collapse, Typography } from 'antd';
import OrderedList from '../../components/orderedList';
import { site } from '../../App';
import styled from 'styled-components';
import { WHITE } from '../../utils/colors';
import { Trans, useTranslation } from 'react-i18next';
import { n } from '../../utils/stringFormat';
import { BOSTON_311_LINK } from '../../assets/links';

const WhitePanel = styled(Collapse.Panel)`
  background: ${WHITE};
  font-size: 16px;

  & .ant-collapse-header {
    font-weight: bold;
    font-size: 18px;
  }
`;

const FAQ: React.FC = () => {
  const { t } = useTranslation(n(site, ['faq']), { nsMode: 'fallback' });

  const answerTwo = [
    <Trans
      ns="faq"
      i18nKey="answers.two.one"
      components={{
        homeLink: (
          <a
            href="https://map.treeboston.org/my-trees"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
          </a>
        ),
      }}
      key="answers.two.one"
    />,
    ...(t('answers.two.two', { returnObjects: true }) as string[]),
  ];

  const boston311Link = (
    <a href={BOSTON_311_LINK} target="_blank" rel="noopener noreferrer">
      {' '}
    </a>
  );

  return (
    <>
      <Helmet>
        <title>{t('faq')}</title>
        <meta
          name="description"
          content="Answers to frequently asked questions when using the Adopt-A-Tree site."
        />
      </Helmet>

      <PageLayout>
        <PaddedPageContainer>
          <PageHeader pageTitle={t('title')} />
          <Collapse defaultActiveKey={1}>
            <WhitePanel key={1} header={t('questions.one')}>
              <OrderedList items={t('answers.one', { returnObjects: true })} />
            </WhitePanel>
            <WhitePanel key={2} header={t('questions.two')}>
              <OrderedList items={answerTwo} />
            </WhitePanel>
            <WhitePanel key={3} header={t('questions.three')}>
              <Typography.Paragraph>
                {t('answers.three', { joinArrays: ' ' })}
              </Typography.Paragraph>
            </WhitePanel>
            <WhitePanel key={4} header={t('questions.four')}>
              <Trans
                ns="faq"
                i18nKey="answers.four"
                components={{
                  myTreesLink: (
                    <a
                      href="https://map.treeboston.org/my-trees"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {' '}
                    </a>
                  ),
                }}
              />
            </WhitePanel>
            <WhitePanel key={5} header={t('questions.five')}>
              {t('answers.five')}
            </WhitePanel>
            <WhitePanel key={6} header={t('questions.six')}>
              <Trans
                ns="faq"
                i18nKey="answers.six"
                components={{
                  boston311Link,
                }}
              />
            </WhitePanel>
            <WhitePanel key={7} header={t('questions.seven')}>
              <Trans
                ns="faq"
                i18nKey="answers.seven"
                components={{
                  boston311Link,
                }}
              />
            </WhitePanel>
            <WhitePanel key={8} header={t('questions.eight')}>
              {t('answers.eight')}
            </WhitePanel>
          </Collapse>
        </PaddedPageContainer>
      </PageLayout>
    </>
  );
};

export default FAQ;
