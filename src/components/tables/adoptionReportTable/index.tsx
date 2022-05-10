import React from 'react';
import { AdoptionReportEntry } from '../../../containers/reports/ducks/types';
import { Table } from 'antd';
import SiteLink from '../siteLink';
import { dateSorter, DESCEND_ORDER } from '../utils';
import CopyText from '../../copyText';
import { NEIGHBORHOOD_IDS } from '../../../assets/content';

interface AdoptionReportTableProps {
  readonly adoptionReportEntries: AdoptionReportEntry[];
}

const AdoptionReportTable: React.FC<AdoptionReportTableProps> = ({
  adoptionReportEntries,
}) => {
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
        title={'Site ID'}
        dataIndex={'siteId'}
        key={'siteId'}
        render={(siteId: number) => <SiteLink siteId={siteId} />}
      />
      <Table.Column title={'Address'} dataIndex={'address'} key={'address'} />
      <Table.Column title={"Adopter's Name"} dataIndex={'name'} key={'name'} />
      <Table.Column
        title={"Adopter's Email"}
        dataIndex={'email'}
        key={'email'}
        render={(email: string) => <CopyText text={email} />}
      />
      <Table.Column
        title={'Date Adopted'}
        dataIndex={'dateAdopted'}
        key={'dateAdopted'}
        defaultSortOrder={DESCEND_ORDER}
        sorter={(a: AdoptionReportEntry, b: AdoptionReportEntry): number =>
          dateSorter(a.dateAdopted, b.dateAdopted)
        }
      />
      <Table.Column
        title={'Activity Count'}
        dataIndex={'activityCount'}
        key={'activityCount'}
      />
      <Table.Column
        title={'Neighborhood'}
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
