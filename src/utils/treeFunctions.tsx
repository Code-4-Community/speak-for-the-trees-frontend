import { SiteProps, TreeCare } from '../containers/treePage/ducks/types';
import moment from 'moment';
import startCase from 'lodash/startCase';

export function treeCareToMoment(activity: TreeCare): moment.Moment {
  return moment(
    `${activity.month} ${activity.day} ${activity.year}`,
    'MMM Do YYYY',
  );
}

export const getCommonName = (siteData: SiteProps): string =>
  startCase(siteData.entries[0]?.commonName) || 'tree';
