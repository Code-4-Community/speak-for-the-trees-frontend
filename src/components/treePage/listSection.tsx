import React, { ReactNode, useState } from 'react';
import { Button, Divider, Typography } from 'antd';
import { Entry } from '../../containers/treePage/ducks/types';
import { DARK_GREEN, MID_GREEN, WHITE } from '../../utils/colors';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { site } from '../../constants';
import { n } from '../../utils/stringFormat';
import { Flex } from '../themedComponents';

const Title = styled(Typography.Title)`
  display: flex;
  align-items: center;
  column-gap: 5px;

  &.ant-typography {
    color: ${DARK_GREEN};
  }
`;

const SectionDivider = styled(Divider)`
  margin-top: 10px;
  margin-bottom: 20px;
`;

const EntryTitle = styled(Typography.Paragraph)`
  color: ${MID_GREEN};
  width: 50%;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
`;

const EntryValue = styled(Typography.Paragraph)`
  width: 50%;
  font-size: 16px;
  line-height: normal;
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

interface ListSectionProps {
  readonly title: string;
  readonly headerIcon?: ReactNode;
  readonly entries: Entry[];
  readonly canHide: boolean;
  readonly hideText?: string;
  readonly showText?: string;
}

const ListSection: React.FC<ListSectionProps> = ({
  title,
  headerIcon,
  entries,
  canHide,
  hideText,
  showText,
}) => {
  const { t } = useTranslation(n(site, 'treePage'), { nsMode: 'fallback' });

  const [visible, setVisible] = useState<boolean>(!canHide);

  const toggleVisibility = () => setVisible((prevState) => !prevState);

  return (
    <>
      {visible && (
        <>
          <Title level={2}>
            {headerIcon}
            {title}
          </Title>

          <SectionDivider />

          {entries.map((entry: Entry) => {
            return (
              <Flex gap="15px" flexWrap="nowrap" key={entry.title}>
                <EntryTitle>{entry.title}</EntryTitle>
                <EntryValue>{entry.value}</EntryValue>
              </Flex>
            );
          })}
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
