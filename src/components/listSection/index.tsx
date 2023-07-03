import React, { useState } from 'react';
import { Button, Typography } from 'antd';
import { Entry } from '../../containers/treePage/ducks/types';
import { DARK_GREEN, MID_GREEN, WHITE } from '../../utils/colors';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { site } from '../../constants';
import { n } from '../../utils/stringFormat';

interface ListSectionProps {
  readonly title: string;
  readonly hasIcon?: boolean;
  readonly entries: Entry[];
  readonly canHide: boolean;
  readonly hideText?: string;
  readonly showText?: string;
}

// const CardBox = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: flex-start;
//   align-content: flex-start;
//   gap: 15px;
//   flex-grow: 1;
// `;

// const StyledCard = styled.div`
//   height: 150px;
//   width: 275px;
//   padding: 20px;
//   border: solid 1px ${LIGHT_GREY};
//   overflow: hidden;
// `;

// const EntryMessage = styled(Typography.Paragraph)`
//   color: ${TEXT_GREY};
//   line-height: 18px;
//   text-transform: capitalize;
//   font-size: 15px;
// `;

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

const ListSection: React.FC<ListSectionProps> = ({
  title,
  hasIcon = false,
  entries,
  canHide,
  hideText,
  showText,
}) => {
  const { t } = useTranslation(n(site, 'treePage'), {
    nsMode: 'fallback',
  });

  const [visible, setVisible] = useState<boolean>(!canHide);

  const toggleVisibility = () => {
    setVisible((prevState) => !prevState);
  };

  return (
    <>
      {visible && (
        <>
          <Typography.Title level={3}>{title}</Typography.Title>

          {/* <CardBox>
            {entries.map((entry: Entry) => {
              return (
                <StyledCard key={entry.title}>
                  <Typography.Title level={4}>{entry.title}</Typography.Title>
                  <EntryMessage>{entry.value}</EntryMessage>
                </StyledCard>
              );
            })}
          </CardBox> */}
        </>
      )}

      {canHide && (
        <ToggleButton type="text" onClick={toggleVisibility}>
          {visible
            ? hideText || t('info_tiles.hide_default')
            : showText || t('info_tiles.show_default')}
        </ToggleButton>
      )}
    </>
  );
};

export default ListSection;
