import React from 'react';
import { AdoptionReportEntry } from '../../../containers/reports/ducks/types';
import { Table, Typography } from 'antd';
import { ParameterizedRouteBases } from '../../../App';
import { DESCEND_ORDER } from '../types';

const { Link } = Typography;

const AdoptionReportTableColumns = [
  {
    title: 'Site ID',
    dataIndex: 'siteId',
    key: 'siteId',
    render: function renderSiteId(siteId: number) {
      return (
        <Link
          href={`${ParameterizedRouteBases.TREE}${siteId}`}
          target={'_blank'}
        >
          {siteId}
        </Link>
      );
    },
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
      new Date(a.dateAdopted).valueOf() - new Date(b.dateAdopted).valueOf(),
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
