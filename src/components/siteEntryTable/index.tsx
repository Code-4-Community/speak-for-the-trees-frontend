import React from 'react';
import {
  SiteEntry,
  SiteEntryField,
  SiteEntryFields,
} from '../../containers/treePage/ducks/types';
import { Table } from 'antd';
import { booleanToString } from '../../utils/stringFormat';
import { getSEFieldDisplayName } from '../../containers/treePage/ducks/selectors';

interface SiteEntryTableProps {
  readonly siteEntries: SiteEntry[];
}

const Columns = Object.values(SiteEntryFields).map((field: SiteEntryField) => {
  return {
    title: getSEFieldDisplayName(field),
    dataIndex: field,
    key: field,
    render: (val: string | number | boolean): string => {
      if (val || val === false) {
        return booleanToString(String(val));
      } else {
        return '';
      }
    },
  };
});

const SiteEntryTable: React.FC<SiteEntryTableProps> = ({ siteEntries }) => {
  return (
    <Table
      dataSource={siteEntries}
      columns={Columns}
      scroll={{ x: 1300 }}
      rowKey={(siteEntry: SiteEntry) => siteEntry.id}
    />
  );
};

export default SiteEntryTable;
