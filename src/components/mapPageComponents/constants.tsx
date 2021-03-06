import React from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { ReactNode } from 'react';
import { FullWidthSpace, InlineImage } from '../themedComponents';
import youngTreeIcon from '../../assets/images/siteIcons/youngLarge.png';
import standardTreeIcon from '../../assets/images/siteIcons/standardLarge.png';
import adoptedTreeIcon from '../../assets/images/siteIcons/adoptedLarge.png';
import openSiteIcon from '../../assets/images/siteIcons/openLarge.png';
import { Typography } from 'antd';

const MAP_ID = '76c08a2450c223d9';
export const LOADER = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY || '',
  libraries: ['places'],
  mapIds: [MAP_ID],
});

export const BOSTON: google.maps.LatLngLiteral = { lat: 42.315, lng: -71.0589 };
export const BOSTON_BOUNDS = {
  north: 42.42,
  south: 42.2,
  west: -71.28,
  east: -70.83,
};

export const STREET_ZOOM = 19;

// Three years before the current date
export const YOUNG_TREE_DATE = new Date().setFullYear(
  new Date().getFullYear() - 3,
);

const treeSpan = (treeIcon: string, labelString: string): ReactNode => {
  return (
    <FullWidthSpace direction={'horizontal'} size={'small'}>
      <InlineImage src={treeIcon} preview={false} />
      <Typography.Text>{labelString}</Typography.Text>
    </FullWidthSpace>
  );
};
export const ALL_SITES_VISIBLE: CheckboxValueType[] = [
  'Young',
  'Adopted',
  'Standard',
  'Open',
];
export const SITE_OPTIONS: { label: ReactNode; value: string }[] = [
  {
    label: treeSpan(youngTreeIcon, 'Young Trees'),
    value: 'Young',
  },
  {
    label: treeSpan(standardTreeIcon, 'Older Trees'),
    value: 'Standard',
  },
  {
    label: treeSpan(adoptedTreeIcon, 'Adopted Trees'),
    value: 'Adopted',
  },
  {
    label: treeSpan(openSiteIcon, 'Planting Sites'),
    value: 'Open',
  },
];
