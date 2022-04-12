import React from 'react';
import { Helmet } from 'react-helmet';
import PageLayout from '../../components/pageLayout';
import PageHeader from '../../components/pageHeader';
import { PaddedPageContainer } from '../../components/themedComponents';
import { Collapse, Typography } from 'antd';
import {
  ANSWER_EIGHT,
  ANSWER_FIVE,
  ANSWER_FOUR,
  ANSWER_ONE,
  ANSWER_SEVEN,
  ANSWER_SIX,
  ANSWER_THREE,
  ANSWER_TWO,
  QUESTION_EIGHT,
  QUESTION_FIVE,
  QUESTION_FOUR,
  QUESTION_ONE,
  QUESTION_SEVEN,
  QUESTION_SIX,
  QUESTION_THREE,
  QUESTION_TWO,
} from './content';
import QuestionList from '../../components/questionList';
import { Languages } from '../../App';
import styled from 'styled-components';
import { WHITE } from '../../utils/colors';

const WhitePanel = styled(Collapse.Panel)`
  background: ${WHITE};
  font-size: 16px;

  & .ant-collapse-header {
    font-weight: bold;
    font-size: 18px;
  }
`;

const FAQ: React.FC = () => {
  // todo: replace this with prop when implementing languages
  const lang = Languages.ENGLISH;

  return (
    <>
      <Helmet>
        <title>FAQ</title>
        <meta
          name="description"
          content="Answers to frequently asked questions when using the Adopt-A-Tree site."
        />
      </Helmet>

      <PageLayout>
        <PaddedPageContainer>
          <PageHeader pageTitle={'Frequently Asked Questions'} />
          <Collapse defaultActiveKey={1}>
            <WhitePanel key={1} header={QUESTION_ONE[lang]}>
              <QuestionList answers={ANSWER_ONE[lang]} />
            </WhitePanel>
            <WhitePanel key={2} header={QUESTION_TWO[lang]}>
              <QuestionList answers={ANSWER_TWO[lang]} />
            </WhitePanel>
            <WhitePanel key={3} header={QUESTION_THREE[lang]}>
              <Typography.Paragraph>{ANSWER_THREE[lang]}</Typography.Paragraph>
            </WhitePanel>
            <WhitePanel key={4} header={QUESTION_FOUR[lang]}>
              {ANSWER_FOUR[lang]}
            </WhitePanel>
            <WhitePanel key={5} header={QUESTION_FIVE[lang]}>
              {ANSWER_FIVE[lang]}
            </WhitePanel>
            <WhitePanel key={6} header={QUESTION_SIX[lang]}>
              {ANSWER_SIX[lang]}
            </WhitePanel>
            <WhitePanel key={7} header={QUESTION_SEVEN[lang]}>
              {ANSWER_SEVEN[lang]}
            </WhitePanel>
            <WhitePanel key={8} header={QUESTION_EIGHT[lang]}>
              {ANSWER_EIGHT[lang]}
            </WhitePanel>
          </Collapse>
        </PaddedPageContainer>
      </PageLayout>
    </>
  );
};

export default FAQ;
