import React, { useMemo } from 'react';
import { Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  EmailerTableData,
  FilterSitesData,
} from '../../containers/email/types';
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

function responseToTableData(data: FilterSitesData, index: number) {
  return {
    key: index.toString(),
    siteId: data.siteId,
    address: coalesceEmptyString(data.address),
    adopterName: data.adopterName,
    adopterEmail: data.adopterEmail,
    dateAdopted: coalesceEmptyString(data.dateAdopted),
    adopterActivityCount: data.adopterActivityCount,
    neighborhood: NEIGHBORHOOD_IDS[data.neighborhoodId],
    lastActivityWeeks: data.lastActivityWeeks?.toString() ?? 'N/A',
  };
}

const AdoptedSitesTable: React.FC<AdoptedSitesTableProps> = ({ fetchData }) => {
  const tableData = useMemo(
    () =>
      [].concat(
        ...Array.from({ length: 10 }, () => fetchData.map(responseToTableData)),
      ),
    [fetchData],
  );

  return fetchData.length > 0 ? (
    <Table
      columns={columns}
      dataSource={tableData}
      size="middle"
      rowSelection={{ type: 'checkbox' }}
      // pagination={{ style: { color: 'white' } }}
    />
  ) : (
    <Typography.Title level={3}>
      No data present! Adjust the filters, then click then search button to
      populate the table.
    </Typography.Title>
  );
};

export default AdoptedSitesTable;
