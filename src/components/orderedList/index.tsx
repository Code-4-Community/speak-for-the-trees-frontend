import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface StyledListProps {
  readonly indent?: boolean;
}

const StyledList = styled.ol`
  width: 90%;
  list-style-position: ${({ indent }: StyledListProps) =>
    indent ? 'inside' : 'inherit'};
  padding-left: ${({ indent }: StyledListProps) => (indent ? 0 : 'inherit')};
`;

interface OrderedListProps {
  readonly items: ReactNode[];
  readonly indent?: boolean;
}

const OrderedList: React.FC<OrderedListProps> = ({ items, indent }) => {
  return (
    <StyledList indent={indent}>
      {items.map((item: ReactNode, index: number) => {
        return <li key={index}>{item}</li>;
      })}
    </StyledList>
  );
};

export default OrderedList;
