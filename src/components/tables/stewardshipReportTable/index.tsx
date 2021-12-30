import React from 'react';
import { StewardshipReportEntry } from '../../../containers/reports/ducks/types';
import { Table, Tag, Typography } from 'antd';
import { ParameterizedRouteBases } from '../../../App';
import { DESCEND_ORDER } from '../types';

const { Link } = Typography;

interface StewardshipReportTableEntry {
  readonly entryId: number;
  readonly siteId: number;
  readonly address: string;
  readonly name: string;
  readonly email: string;
  readonly datePerformed: Date;
  readonly activitiesPerformed: string[];
  readonly neighborhood: string;
}

const stewardshipReportTableColumns = [
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
    title: 'Date Performed',
    dataIndex: 'datePerformed',
    key: 'datePerformed',
    defaultSortOrder: DESCEND_ORDER,
    sorter: (a: StewardshipReportTableEntry, b: StewardshipReportTableEntry) =>
      new Date(a.datePerformed).valueOf() - new Date(b.datePerformed).valueOf(),
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
    render: function renderActivities(activities: string[]) {
      return (
        <>
          {activities.map((activity: string) => {
            return <Tag key={activity}>{activity}</Tag>;
          })}
        </>
      );
    },
  },
];

interface StewardshipReportTableProps {
  readonly stewardshipReportEntries: StewardshipReportEntry[];
}

const StewardshipReportTable: React.FC<StewardshipReportTableProps> = ({
  stewardshipReportEntries,
}) => {
  const tableStewardshipReport: StewardshipReportTableEntry[] = stewardshipReportEntries.map(
    (entry, idx) => {
      const activitiesPerformed = [];

      if (entry.watered) {
        activitiesPerformed.push('watered');
      }
      if (entry.mulched) {
        activitiesPerformed.push('mulched');
      }
      if (entry.cleaned) {
        activitiesPerformed.push('cleaned');
      }
      if (entry.weeded) {
        activitiesPerformed.push('weeded');
      }

      return {
        entryId: idx,
        siteId: entry.siteId,
        address: entry.address,
        name: entry.name,
        email: entry.email,
        datePerformed: entry.datePerformed,
        activitiesPerformed,
        neighborhood: entry.neighborhood,
      };
    },
  );

  return (
    <Table
      columns={stewardshipReportTableColumns}
      dataSource={tableStewardshipReport}
      scroll={{ x: 1000 }}
      rowKey={(reportEntry: StewardshipReportTableEntry) => reportEntry.entryId}
      pagination={{ hideOnSinglePage: true }}
    />
  );
};

export default StewardshipReportTable;
