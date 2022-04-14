import React, { ReactNode } from 'react';

interface OrderedListProps {
  readonly items: ReactNode[];
}

const OrderedList: React.FC<OrderedListProps> = ({ items }) => {
  return (
    <ol>
      {items.map((item: ReactNode, index: number) => {
        return <li key={index}>{item}</li>;
      })}
    </ol>
  );
};

export default OrderedList;
