import React from 'react';
import {
  AdoptionReportEntry,
  StewardshipReportTableEntry,
} from '../../../containers/reports/ducks/types';
import { Table } from 'antd';
import SiteLink from '../siteLink';
import { dateSorter, DESCEND_ORDER } from '../utils';
import Tags from '../tags';
import CopyText from '../../copyText';
import { NEIGHBORHOOD_IDS } from '../../../assets/content';

interface StewardshipReportTableProps {
  readonly stewardshipReportTableEntries: StewardshipReportTableEntry[];
}

const StewardshipReportTable: React.FC<StewardshipReportTableProps> = ({
  stewardshipReportTableEntries,
}) => {
  return (
    <Table
      dataSource={stewardshipReportTableEntries}
      scroll={{ x: 1000 }}
      rowKey={(reportEntry: StewardshipReportTableEntry) => reportEntry.entryId}
      pagination={{ hideOnSinglePage: true }}
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
        title={'Date Performed'}
        dataIndex={'datePerformed'}
        key={'datePerformed'}
        defaultSortOrder={DESCEND_ORDER}
        sorter={(
          a: StewardshipReportTableEntry,
          b: StewardshipReportTableEntry,
        ): number => dateSorter(a.datePerformed, b.datePerformed)}
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
      <Table.Column
        title={'Activities Performed'}
        dataIndex={'activitiesPerformed'}
        key={'activitiesPerformed'}
        render={(activities: string[]) => <Tags tagTexts={activities} />}
      />
    </Table>
  );
};

export default StewardshipReportTable;
