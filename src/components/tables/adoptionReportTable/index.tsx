import React from 'react';
import { AdoptionReportEntry } from '../../../containers/reports/ducks/types';
import { Table } from 'antd';
import { dateSorter, DESCEND_ORDER, renderSiteIdAsLink } from '../utils';

const AdoptionReportTableColumns = [
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
    title: 'Date Adopted',
    dataIndex: 'dateAdopted',
    key: 'dateAdopted',
    defaultSortOrder: DESCEND_ORDER,
    sorter: (a: AdoptionReportEntry, b: AdoptionReportEntry) =>
      dateSorter(a.dateAdopted, b.dateAdopted),
  },
  {
    title: 'Activity Count',
    dataIndex: 'activityCount',
    key: 'activityCount',
  },
  {
    title: 'Neighborhood',
    dataIndex: 'neighborhood',
    key: 'neighborhood',
    // todo add filter
  },
];

interface AdoptionReportTableProps {
  readonly adoptionReportEntries: AdoptionReportEntry[];
}

const AdoptionReportTable: React.FC<AdoptionReportTableProps> = ({
  adoptionReportEntries,
}) => {
  return (
    <Table
      columns={AdoptionReportTableColumns}
      dataSource={adoptionReportEntries}
      scroll={{ x: 1000 }}
      rowKey={(reportEntry: AdoptionReportEntry) => reportEntry.siteId}
      pagination={{
        hideOnSinglePage: true,
      }}
    />
  );
};

export default AdoptionReportTable;
