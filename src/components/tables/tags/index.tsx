import React from 'react';
import Tag from 'antd/es/tag';

interface TagsProps {
  readonly tagTexts: string[];
}

const Tags: React.FC<TagsProps> = ({ tagTexts }) => {
  return (
    <>
      {tagTexts.map((text: string) => {
        return <Tag key={text}>{text}</Tag>;
      })}
    </>
  );
};

export default Tags;
