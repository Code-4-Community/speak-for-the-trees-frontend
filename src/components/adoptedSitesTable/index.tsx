import React from 'react';
import { Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  EmailerTableData,
  FilterSitesData,
} from '../../containers/email/types';
import dummyResponse from './dummyData';
import { NEIGHBORHOOD_IDS } from '../../assets/content';

interface AdoptedSitesTableProps {
  readonly fetchData: FilterSitesData[];
}

const columns: ColumnsType<EmailerTableData> = [
  {
    title: 'Site ID',
    dataIndex: 'siteId',
    key: 'siteId',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: "Adopter's Name",
    dataIndex: 'adopterName',
    key: 'adopterName',
  },
  {
    title: 'Date Adopted',
    dataIndex: 'dateAdopted',
    key: 'dateAdopted',
  },
  {
    title: 'Activity Count',
    dataIndex: 'adopterActivityCount',
    key: 'adopterActivityCount',
  },
  {
    title: 'Neighborhood',
    dataIndex: 'neighborhood',
    key: 'neighborhood',
  },
  {
    title: 'Weeks Since Last Activity',
    dataIndex: 'lastActivityWeeks',
    key: 'lastActivityWeeks',
  },
];

function coalesceEmptyString(s?: string) {
  return s === undefined || s?.length === 0 ? 'N/A' : s;
}

const data: EmailerTableData[] = dummyResponse.map((res, i) => {
  return {
    key: i.toString(),
    siteId: res.siteId,
    address: coalesceEmptyString(res.address),
    adopterName: res.adopterName,
    adopterEmail: res.adopterEmail,
    dateAdopted: coalesceEmptyString(res.dateAdopted),
    adopterActivityCount: res.adopterActivityCount,
    neighborhood: NEIGHBORHOOD_IDS[res.neighborhoodId],
    lastActivityWeeks: res.lastActivityWeeks?.toString() ?? 'N/A',
  };
});

// const rowSelection = {
//   onChange: (selectedRowKeys: string[], selectedRows: EmailerTableData[]) => {}
// }

const AdoptedSitesTable: React.FC<AdoptedSitesTableProps> = ({ fetchData }) => {
  return fetchData.length > 0 ? (
    <Table
      columns={columns}
      dataSource={data}
      size="middle"
      rowSelection={{ type: 'checkbox' }}
    />
  ) : (
    <Typography.Title level={3}>
      No data present! Adjust the filters, then click then search button to
      populate the table.
    </Typography.Title>
  );
};

export default AdoptedSitesTable;
