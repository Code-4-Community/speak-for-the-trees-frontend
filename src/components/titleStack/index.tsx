import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { BlockProps, Block } from '../themedComponents';

const { Text } = Typography;

const StackTitle = styled(Text)`
  font-weight: bold;
  font-size: 16px;
`;

interface TitleStackProps extends BlockProps {
  title: string;
}

const TitleStack: React.FC<TitleStackProps> = ({
  title,
  minWidth,
  flexGrow,
  children,
}) => {
  return (
    <Block minWidth={minWidth} flexGrow={flexGrow}>
      <StackTitle>{title}</StackTitle>
      <Block>{children}</Block>
    </Block>
  );
};

export default TitleStack;
