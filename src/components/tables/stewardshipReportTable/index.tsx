import React from 'react';
import { StewardshipReportTableEntry } from '../../../containers/reports/ducks/types';
import { Table } from 'antd';
import {
  dateSorter,
  DESCEND_ORDER,
  renderActivities,
  renderSiteIdAsLink,
} from '../utils';

const stewardshipReportTableColumns = [
  {
    title: 'Site ID',
    dataIndex: 'siteId',
    key: 'siteId',
    render: renderSiteIdAsLink,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: "Adopter's Name",
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: "Adopter's Email",
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Date Performed',
    dataIndex: 'datePerformed',
    key: 'datePerformed',
    defaultSortOrder: DESCEND_ORDER,
    sorter: (a: StewardshipReportTableEntry, b: StewardshipReportTableEntry) =>
      dateSorter(a.datePerformed, b.datePerformed),
  },
  {
    title: 'Neighborhood',
    dataIndex: 'neighborhood',
    key: 'neighborhood',
    // todo add filter
  },
  {
    title: 'Activities Performed',
    dataIndex: 'activitiesPerformed',
    key: 'activitiesPerformed',
    render: renderActivities,
  },
];

interface StewardshipReportTableProps {
  readonly stewardshipReportTableEntries: StewardshipReportTableEntry[];
}

const StewardshipReportTable: React.FC<StewardshipReportTableProps> = ({
  stewardshipReportTableEntries,
}) => {
  return (
    <Table
      columns={stewardshipReportTableColumns}
      dataSource={stewardshipReportTableEntries}
      scroll={{ x: 1000 }}
      rowKey={(reportEntry: StewardshipReportTableEntry) => reportEntry.entryId}
      pagination={{ hideOnSinglePage: true }}
    />
  );
};

export default StewardshipReportTable;
