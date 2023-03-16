import React from 'react';
import { useTranslation } from 'react-i18next';
import { AdoptionReportEntry } from '../../../containers/reports/ducks/types';
import { Table } from 'antd';
import { site } from '../../../App';
import SiteLink from '../siteLink';
import { dateSorter, DESCEND_ORDER } from '../utils';
import CopyText from '../../copyText';
import { NEIGHBORHOOD_IDS } from '../../../assets/content';
import { n } from '../../../utils/stringFormat';

interface AdoptionReportTableProps {
  readonly adoptionReportEntries: AdoptionReportEntry[];
}

const AdoptionReportTable: React.FC<AdoptionReportTableProps> = ({
  adoptionReportEntries,
}) => {
  const { t } = useTranslation(n(site, ['tables']), { nsMode: 'fallback' });

  return (
    <Table
      dataSource={adoptionReportEntries}
      scroll={{ x: 1000 }}
      rowKey={(reportEntry: AdoptionReportEntry) => reportEntry.siteId}
      pagination={{
        hideOnSinglePage: true,
      }}
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
        title={t('report_columns.date_adopted')}
        dataIndex={'dateAdopted'}
        key={'dateAdopted'}
        defaultSortOrder={DESCEND_ORDER}
        sorter={(a: AdoptionReportEntry, b: AdoptionReportEntry): number =>
          dateSorter(a.dateAdopted, b.dateAdopted)
        }
      />
      <Table.Column
        title={t('report_columns.activity_count')}
        dataIndex={'activityCount'}
        key={'activityCount'}
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
    </Table>
  );
};

export default AdoptionReportTable;
