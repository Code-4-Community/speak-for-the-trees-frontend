import React from 'react';
import {
  ExtraSiteEntryNames,
  MainSiteEntryNames,
  SiteEntry,
} from '../../containers/treePage/ducks/types';
import { Table } from 'antd';
import { booleanToString } from '../../utils/stringFormat';

interface SiteEntryTableProps {
  readonly siteEntries: SiteEntry[];
}

const renderBoolean = (bool: boolean): string => {
  return booleanToString(String(bool));
};

const SiteEntryTable: React.FC<SiteEntryTableProps> = ({ siteEntries }) => {
  const columns = [
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: ExtraSiteEntryNames.treePresent,
      dataIndex: 'treePresent',
      key: 'treePresent',
      render: renderBoolean,
    },
    {
      title: MainSiteEntryNames.status,
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: MainSiteEntryNames.genus,
      dataIndex: 'genus',
      key: 'genus',
    },
    {
      title: MainSiteEntryNames.species,
      dataIndex: 'species',
      key: 'species',
    },
    {
      title: MainSiteEntryNames.commonName,
      dataIndex: 'commonName',
      key: 'commonName',
    },
    {
      title: ExtraSiteEntryNames.confidence,
      dataIndex: 'confidence',
      key: 'confidence',
    },
    {
      title: MainSiteEntryNames.diameter,
      dataIndex: 'diameter',
      key: 'diameter',
    },
    {
      title: ExtraSiteEntryNames.circumference,
      dataIndex: 'circumference',
      key: 'circumference',
    },
    {
      title: ExtraSiteEntryNames.multistem,
      dataIndex: 'multistem',
      key: 'multistem',
      render: renderBoolean,
    },
    {
      title: ExtraSiteEntryNames.coverage,
      dataIndex: 'coverage',
      key: 'coverage',
    },
    {
      title: ExtraSiteEntryNames.pruning,
      dataIndex: 'pruning',
      key: 'pruning',
    },
    {
      title: ExtraSiteEntryNames.condition,
      dataIndex: 'condition',
      key: 'condition',
    },
    {
      title: ExtraSiteEntryNames.discoloring,
      dataIndex: 'discoloring',
      key: 'discoloring',
      render: renderBoolean,
    },
    {
      title: ExtraSiteEntryNames.leaning,
      dataIndex: 'leaning',
      key: 'leaning',
      render: renderBoolean,
    },
    {
      title: ExtraSiteEntryNames.constrictingGrate,
      dataIndex: 'constrictingGrate',
      key: 'constrictingGrate',
      render: renderBoolean,
    },
    {
      title: ExtraSiteEntryNames.wounds,
      dataIndex: 'wounds',
      key: 'wounds',
      render: renderBoolean,
    },
    {
      title: ExtraSiteEntryNames.pooling,
      dataIndex: 'pooling',
      key: 'pooling',
      render: renderBoolean,
    },
    {
      title: ExtraSiteEntryNames.stakesWith,
      dataIndex: 'stakesWithWires',
      key: 'stakesWith',
      render: renderBoolean,
    },
    {
      title: ExtraSiteEntryNames.stakesWithout,
      dataIndex: 'stakesWithoutWires',
      key: 'stakesWithout',
      render: renderBoolean,
    },
    {
      title: ExtraSiteEntryNames.light,
      dataIndex: 'light',
      key: 'light',
      render: renderBoolean,
    },
    {
      title: ExtraSiteEntryNames.bicycle,
      dataIndex: 'bicycle',
      key: 'bicycle',
      render: renderBoolean,
    },
    {
      title: ExtraSiteEntryNames.bagEmpty,
      dataIndex: 'bagEmpty',
      key: 'bagWith',
      render: renderBoolean,
    },
    {
      title: ExtraSiteEntryNames.bagFilled,
      dataIndex: 'bagFilled',
      key: 'bagWithout',
      render: renderBoolean,
    },
    {
      title: ExtraSiteEntryNames.tape,
      dataIndex: 'tape',
      key: 'tape',
      render: renderBoolean,
    },
    {
      title: ExtraSiteEntryNames.suckerGrowth,
      dataIndex: 'suckerGrowth',
      key: 'suckerGrowth',
      render: renderBoolean,
    },
    {
      title: ExtraSiteEntryNames.siteType,
      dataIndex: 'siteType',
      key: 'siteType',
    },
    {
      title: ExtraSiteEntryNames.sidewalkWidth,
      dataIndex: 'sidewalkWidth',
      key: 'sidewalkWidth',
    },
    {
      title: ExtraSiteEntryNames.siteWidth,
      dataIndex: 'siteWidth',
      key: 'siteWidth',
    },
    {
      title: ExtraSiteEntryNames.siteLength,
      dataIndex: 'siteLength',
      key: 'siteLength',
    },
    {
      title: ExtraSiteEntryNames.material,
      dataIndex: 'material',
      key: 'material',
    },
    {
      title: ExtraSiteEntryNames.raisedBed,
      dataIndex: 'raisedBed',
      key: 'raisedBed',
      render: renderBoolean,
    },
    {
      title: ExtraSiteEntryNames.fence,
      dataIndex: 'fence',
      key: 'fence',
      render: renderBoolean,
    },
    {
      title: ExtraSiteEntryNames.trash,
      dataIndex: 'trash',
      key: 'trash',
      render: renderBoolean,
    },
    {
      title: ExtraSiteEntryNames.wires,
      dataIndex: 'wires',
      key: 'wires',
      render: renderBoolean,
    },
    {
      title: ExtraSiteEntryNames.grate,
      dataIndex: 'grate',
      key: 'grate',
      render: renderBoolean,
    },
    {
      title: ExtraSiteEntryNames.stump,
      dataIndex: 'stump',
      key: 'stump',
      render: renderBoolean,
    },
    {
      title: ExtraSiteEntryNames.treeNotes,
      dataIndex: 'treeNotes',
      key: 'treeNotes',
    },
    {
      title: ExtraSiteEntryNames.siteNotes,
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
