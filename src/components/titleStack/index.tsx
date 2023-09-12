import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import Typography from 'antd/es/typography';
import { BlockProps, Block } from '../themedComponents';

const StackTitle = styled(Typography.Text)`
  font-weight: bold;
  font-size: 16px;
`;

interface TitleStackProps extends BlockProps {
  title: string;
}

const TitleStack: React.FC<PropsWithChildren<TitleStackProps>> = ({
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
