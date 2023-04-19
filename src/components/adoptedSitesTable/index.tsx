import React, { SetStateAction, useMemo, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EmailerTableData, FilteredSite } from '../../containers/email/types';
import { NEIGHBORHOOD_IDS } from '../../assets/content';

interface AdoptedSitesTableProps {
  readonly fetchData: FilteredSite[];
  readonly setSelectedEmails: React.Dispatch<SetStateAction<string[]>>;
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
  return s === undefined || s === '' ? 'N/A' : s;
}

function responseToTableData(
  data: FilteredSite,
  index: number,
): EmailerTableData {
  return {
    key: index,
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

const AdoptedSitesTable: React.FC<AdoptedSitesTableProps> = ({
  fetchData,
  setSelectedEmails,
}) => {
  const tableData = useMemo(
    () => fetchData.map(responseToTableData),
    [fetchData],
  );

  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      size="middle"
      rowSelection={{
        selectedRowKeys,
        onChange: (_, selectedRows) => {
          setSelectedEmails(selectedRows.map((row) => row.adopterEmail));
          setSelectedRowKeys(selectedRows.map((row) => row.key));
        },
      }}
    />
  );
};

export default AdoptedSitesTable;
