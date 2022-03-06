import React, { useState } from 'react';
import { Button, Card, List, Typography } from 'antd';
import { Entry } from '../../containers/treePage/ducks/types';
import {
  DARK_GREEN,
  LIGHT_GREY,
  MID_GREEN,
  TEXT_GREY,
  WHITE,
} from '../../utils/colors';
import styled from 'styled-components';
import { CenterDiv } from '../themedComponents';

const StyledCard = styled(Card)`
  height: 125px;
  min-width: 15vw;
  border: solid 1px ${LIGHT_GREY};
  overflow: auto;
`;

const ToggleButton = styled(Button)`
  background: ${WHITE};
  color: ${DARK_GREEN};
  font-weight: bold;
  margin-bottom: 10px;
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

const EntryMessage = styled(Typography.Paragraph)`
  color: ${TEXT_GREY};
  line-height: 14px;
  text-transform: capitalize;
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
          <List
            dataSource={entries}
            grid={{
              gutter: 16,
              xs: 1,
              sm: 1,
              md: 3,
              lg: 3,
              xl: 5,
              xxl: 5,
            }}
            renderItem={(entry: Entry) => (
              <List.Item>
                <StyledCard key={entry.title}>
                  <Typography.Title level={4}>{entry.title}</Typography.Title>
                  <EntryMessage>{entry.value}</EntryMessage>
                </StyledCard>
              </List.Item>
            )}
          />
        </>
      )}

      {canHide && (
        <CenterDiv>
          <ToggleButton type="text" onClick={toggleVisibility}>
            {visible ? hideText || 'Hide Data' : showText || 'Show Data'}
          </ToggleButton>
        </CenterDiv>
      )}
    </>
  );
};

export default EntryList;
