import { TreeCare } from '../containers/treePage/ducks/types';
import moment from 'moment';

export function treeCareToMoment(activity: TreeCare): moment.Moment {
  return moment(
    `${activity.month} ${activity.day} ${activity.year}`,
    'MMM Do YYYY',
  );
}
