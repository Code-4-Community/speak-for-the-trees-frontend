import React from 'react';
import { ParameterizedRouteBases } from '../../App';
import { Tag, Typography } from 'antd';

const { Link } = Typography;

export const DESCEND_ORDER: 'descend' | 'ascend' | null | undefined = 'descend';

export function dateSorter(a: Date, b: Date): number {
  return new Date(a).valueOf() - new Date(b).valueOf();
}

export function renderSiteIdAsLink(siteId: number): JSX.Element {
  return (
    <Link href={`${ParameterizedRouteBases.TREE}${siteId}`} target={'_blank'}>
      {siteId}
    </Link>
  );
}

export function renderActivities(activities: string[]): JSX.Element {
  return (
    <>
      {activities.map((activity: string) => {
        return <Tag key={activity}>{activity}</Tag>;
      })}
    </>
  );
}
