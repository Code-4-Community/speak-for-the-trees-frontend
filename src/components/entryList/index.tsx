import React, { useState } from 'react';
import { Button, Typography } from 'antd';
import { Entry } from '../../containers/treePage/ducks/types';
import {
  DARK_GREEN,
  LIGHT_GREY,
  MID_GREEN,
  TEXT_GREY,
  WHITE,
} from '../../utils/colors';
import styled from 'styled-components';

const CardBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  gap: 15px;
  flex-grow: 1;
`;

const StyledCard = styled.div`
  height: 150px;
  width: 275px;
  padding: 20px;
  border: solid 1px ${LIGHT_GREY};
  overflow: hidden;
`;

const EntryMessage = styled(Typography.Paragraph)`
  color: ${TEXT_GREY};
  line-height: 18px;
  text-transform: capitalize;
  font-size: 15px;
`;

const ToggleButton = styled(Button)`
  background: ${WHITE};
  color: ${DARK_GREEN};
  font-weight: bold;
  margin-bottom: 10px;
  padding: 0;
  &:hover {
    background: ${WHITE};
    color: ${MID_GREEN};
  }
  &:active {
    background: ${WHITE};
    color: ${MID_GREEN};
  }
  &:focus {
    background: ${WHITE};
    color: ${DARK_GREEN};
  }
`;

interface EntryListProps {
  readonly entries: Entry[];
  readonly canHide: boolean;
  readonly hideText?: string;
  readonly showText?: string;
  readonly title?: string;
}

const EntryList: React.FC<EntryListProps> = ({
  entries,
  canHide,
  hideText,
  showText,
  title,
}) => {
  const [visible, setVisible] = useState<boolean>(!canHide);

  const toggleVisibility = (): void => {
    setVisible((prevState) => !prevState);
  };

  return (
    <>
      {visible && (
        <>
          {title && <Typography.Title level={4}>{title}</Typography.Title>}
          <CardBox>
            {entries.map((entry: Entry) => {
              return (
                <StyledCard key={entry.title}>
                  <Typography.Title level={4}>{entry.title}</Typography.Title>
                  <EntryMessage>{entry.value}</EntryMessage>
                </StyledCard>
              );
            })}
          </CardBox>
        </>
      )}

      {canHide && (
        <ToggleButton type="text" onClick={toggleVisibility}>
          {visible ? hideText || 'Hide Data' : showText || 'Show Data'}
        </ToggleButton>
      )}
    </>
  );
};

export default EntryList;
