import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AdoptionReportEntry,
  StewardshipReportTableEntry,
} from '../../../containers/reports/ducks/types';
import { Table } from 'antd';
import { site } from '../../../constants';
import SiteLink from '../siteLink';
import { dateSorter, DESCEND_ORDER } from '../utils';
import Tags from '../tags';
import CopyText from '../../copyText';
import { NEIGHBORHOOD_IDS } from '../../../assets/content';
import { n } from '../../../utils/stringFormat';

interface StewardshipReportTableProps {
  readonly stewardshipReportTableEntries: StewardshipReportTableEntry[];
}

const StewardshipReportTable: React.FC<StewardshipReportTableProps> = ({
  stewardshipReportTableEntries,
}) => {
  const { t } = useTranslation(n(site, ['tables']), { nsMode: 'fallback' });

  return (
    <Table
      dataSource={stewardshipReportTableEntries}
      scroll={{ x: 1000 }}
      rowKey={(reportEntry: StewardshipReportTableEntry) => reportEntry.entryId}
      pagination={{ hideOnSinglePage: true }}
    >
      <Table.Column
        title={t('report_columns.site_id')}
        dataIndex={'siteId'}
        key={'siteId'}
        render={(siteId: number) => <SiteLink siteId={siteId} />}
      />
      <Table.Column
        title={t('report_columns.address')}
        dataIndex={'address'}
        key={'address'}
      />
      <Table.Column
        title={t('report_columns.adopter_name')}
        dataIndex={'name'}
        key={'name'}
      />
      <Table.Column
        title={t('report_columns.adopter_email')}
        dataIndex={'email'}
        key={'email'}
        render={(email: string) => <CopyText text={email} />}
      />
      <Table.Column
        title={t('report_columns.date_performed')}
        dataIndex={'datePerformed'}
        key={'datePerformed'}
        defaultSortOrder={DESCEND_ORDER}
        sorter={(
          a: StewardshipReportTableEntry,
          b: StewardshipReportTableEntry,
        ): number => dateSorter(a.datePerformed, b.datePerformed)}
      />
      <Table.Column
        title={t('report_columns.neighborhood')}
        dataIndex={'neighborhood'}
        key={'neighborhood'}
        // get every neighborhood in alphabetical order as an option
        filters={Object.values(NEIGHBORHOOD_IDS)
          .sort()
          .map((neighborhood: string) => {
            return { text: neighborhood, value: neighborhood };
          })}
        onFilter={(value, record: AdoptionReportEntry) => {
          return value === record.neighborhood;
        }}
      />
      <Table.Column
        title={t('report_columns.activities_performed')}
        dataIndex={'activitiesPerformed'}
        key={'activitiesPerformed'}
        render={(activities: string[]) => <Tags tagTexts={activities} />}
      />
    </Table>
  );
};

export default StewardshipReportTable;
