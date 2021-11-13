import React from 'react';
import { SiteEntry } from '../../containers/treePage/ducks/types';
import { Table } from 'antd';

interface SiteEntryTableProps {
  readonly siteEntries: SiteEntry[];
}

const SiteEntryTable: React.FC<SiteEntryTableProps> = ({ siteEntries }) => {
  const columns = [
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Genus',
      dataIndex: 'genus',
      key: 'genus',
    },
    {
      title: 'Species',
      dataIndex: 'species',
      key: 'species',
    },
    {
      title: 'Common Name',
      dataIndex: 'commonName',
      key: 'commonName',
    },
    {
      title: 'Confidence',
      dataIndex: 'confidence',
      key: 'confidence',
    },
    {
      title: 'Diameter',
      dataIndex: 'diameter',
      key: 'diameter',
    },
    {
      title: 'Circumference',
      dataIndex: 'circumference',
      key: 'circumference',
    },
    {
      title: 'Coverage',
      dataIndex: 'coverage',
      key: 'coverage',
    },
    {
      title: 'Pruning',
      dataIndex: 'pruning',
      key: 'pruning',
    },
    {
      title: 'Condition',
      dataIndex: 'condition',
      key: 'condition',
    },
    {
      title: 'Discoloring',
      dataIndex: 'discoloring',
      key: 'discoloring',
    },
    {
      title: 'Leaning',
      dataIndex: 'leaning',
      key: 'leaning',
    },
    {
      title: 'Constricting Grate',
      dataIndex: 'constrictingGrate',
      key: 'constrictingGrate',
    },
    {
      title: 'Wounds',
      dataIndex: 'wounds',
      key: 'wounds',
    },
    {
      title: 'Pooling',
      dataIndex: 'pooling',
      key: 'pooling',
    },
    {
      title: 'Has Stakes',
      dataIndex: 'stakesWith',
      key: 'stakesWith',
    },
    {
      title: 'No Stakes',
      dataIndex: 'stakesWithout',
      key: 'stakesWithout',
    },
    {
      title: 'Light',
      dataIndex: 'light',
      key: 'light',
    },
    {
      title: 'Has Bicycle',
      dataIndex: 'bicycle',
      key: 'bicycle',
    },
    {
      title: 'Has Bag',
      dataIndex: 'bagWith',
      key: 'bagWith',
    },
    {
      title: 'No Bag',
      dataIndex: 'bagWithout',
      key: 'bagWithout',
    },
    {
      title: 'Has Tape',
      dataIndex: 'tape',
      key: 'tape',
    },
    {
      title: 'Sucker Growth',
      dataIndex: 'suckerGrowth',
      key: 'suckerGrowth',
    },
    {
      title: 'Is Tree Present?',
      dataIndex: 'treePresent',
      key: 'treePresent',
    },
    {
      title: 'Site Type',
      dataIndex: 'siteType',
      key: 'siteType',
    },
    {
      title: 'Sidewalk Width',
      dataIndex: 'sidewalkWidth',
      key: 'sidewalkWidth',
    },
    {
      title: 'Site Width',
      dataIndex: 'siteWidth',
      key: 'siteWidth',
    },
    {
      title: 'Site Length',
      dataIndex: 'siteLength',
      key: 'siteLength',
    },
    {
      title: 'Material',
      dataIndex: 'material',
      key: 'material',
    },
    {
      title: 'Raised Bed',
      dataIndex: 'raisedBed',
      key: 'raisedBed',
    },
    {
      title: 'Fence',
      dataIndex: 'fence',
      key: 'fence',
    },
    {
      title: 'Trash',
      dataIndex: 'trash',
      key: 'trash',
    },
    {
      title: 'Wires',
      dataIndex: 'wires',
      key: 'wires',
    },
    {
      title: 'Grate',
      dataIndex: 'grate',
      key: 'grate',
    },
    {
      title: 'Stump',
      dataIndex: 'stump',
      key: 'stump',
    },
    {
      title: 'Tree Notes',
      dataIndex: 'treeNotes',
      key: 'treeNotes',
    },
    {
      title: 'Site Notes',
      dataIndex: 'siteNotes',
      key: 'siteNotes',
    },
    {
      title: 'Adopter',
      dataIndex: 'adopter',
      key: 'adopter',
    },
  ];

  return (
    <Table
      dataSource={siteEntries}
      columns={columns}
      scroll={{ x: 1300 }}
      rowKey={(siteEntry: SiteEntry) => siteEntry.id}
    />
  );
};

export default SiteEntryTable;
