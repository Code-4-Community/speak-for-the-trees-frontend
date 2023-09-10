import React from 'react';
import { Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { SplitSiteEntries } from '../../containers/treePage/ducks/types';
import { CenterDiv } from '../../components/themedComponents';
import { site } from '../../constants';
import { n } from '../../utils/stringFormat';
import ListSection from './listSection';
import { DARK_GREEN } from '../../utils/colors';

const EntryDiv = styled(CenterDiv)`
  margin: 10px 0;
`;

const InfoIcon = styled(InfoCircleOutlined)`
  color: ${DARK_GREEN};
  font-size: 20px;
`;

interface LatestEntryInfoProps {
  readonly latestEntry: SplitSiteEntries;
}

export const LatestEntryInfo: React.FC<LatestEntryInfoProps> = ({
  latestEntry,
}) => {
  const { t } = useTranslation(n(site, 'treePage'), { nsMode: 'fallback' });

  return (
    <>
      {/* Display main or extra entries, if there are any. Otherwise, display a message that no entries have been collected. */}
      {latestEntry.main.length !== 0 && (
        <EntryDiv>
          <ListSection
            title={t('info_tiles.about')}
            headerIcon={<InfoIcon />}
            entries={latestEntry.main}
            canHide={false}
          />
        </EntryDiv>
      )}
      {latestEntry.extra.length !== 0 && (
        <EntryDiv>
          <ListSection
            title={t('info_tiles.additional_information')}
            entries={latestEntry.extra}
            canHide={true}
            hideText={t('info_tiles.hide_text')}
            showText={t('info_tiles.show_text')}
          />
        </EntryDiv>
      )}
      {latestEntry.main.length === 0 && latestEntry.extra.length === 0 && (
        <Typography.Title level={2}>{t('no_data')}</Typography.Title>
      )}
    </>
  );
};
