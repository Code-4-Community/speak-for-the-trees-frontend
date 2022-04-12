import React, { ReactNode } from 'react';

interface QuestionPanelProps {
  readonly answers: ReactNode[];
}

const QuestionList: React.FC<QuestionPanelProps> = ({ answers }) => {
  return (
    <ol>
      {answers.map((item: ReactNode, index: number) => {
        return <li key={index}>{item}</li>;
      })}
    </ol>
  );
};

export default QuestionList;
