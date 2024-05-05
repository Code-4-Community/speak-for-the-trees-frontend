import React, { SetStateAction, useMemo, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EmailerTableData, FilteredSite } from '../../containers/email/types';
import { NEIGHBORHOOD_IDS } from '../../assets/content';
import {
  FilteredSiteImage,
  FilterImageTableData,
} from '../../containers/reviewImages/types';

interface UnapprovedImagesTable {
  readonly fetchData: FilteredSiteImage[];
  // readonly setSelectedEmails: React.Dispatch<SetStateAction<string[]>>;
}

const columns: ColumnsType<FilterImageTableData> = [
  {
    title: 'Preview',
    dataIndex: 'preview_url',
    key: 'preview_url',
    render: (dataIndexValue, record) => {
      return <img style={{ height: 60, width: 60 }} src={record.preview}></img>;
    },
  },
  {
    title: 'Site ID',
    dataIndex: 'siteId',
    key: 'siteId',
  },
  {
    title: 'Species',
    dataIndex: 'species',
    key: 'species',
  },
  {
    title: 'Neighborhood',
    dataIndex: 'neighborhood',
    key: 'neighborhood',
  },
  {
    title: 'Date Submitted',
    dataIndex: 'dateSubmitted',
    key: 'dateSubmitted',
  },
];

function responseToTableData(
  data: FilteredSiteImage,
  index: number,
): FilterImageTableData {
  return {
    key: index,
    preview: data.imageUrl,
    siteId: data.siteId,
    dateSubmitted: data.dateSubmitted,
    species: data.commonName,
    neighborhood: NEIGHBORHOOD_IDS[data.neighborhoodId],
  };
}

const UnapprovedImagesTable: React.FC<UnapprovedImagesTable> = ({
  fetchData,
}) => {
  const tableData = useMemo(
    () => (fetchData ? fetchData.map(responseToTableData) : []),
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
          // setSelectedEmails(selectedRows.map((row) => row.adopterEmail));
          setSelectedRowKeys(selectedRows.map((row) => row.key));
        },
      }}
    />
  );
};

export default UnapprovedImagesTable;
