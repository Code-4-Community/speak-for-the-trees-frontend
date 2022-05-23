import moment from 'moment';
import { PrivilegeLevel, SignupRequest } from '../../../auth/ducks/types';

export const BOOL_RADIO_OPTS = [
  { label: 'Yes', value: true },
  { label: 'No', value: false },
];

export interface AuthRequest {
  readonly password: string;
}

export interface ChangeUsernameRequest extends AuthRequest {
  readonly newUsername: string;
}

export interface ChangeEmailRequest extends AuthRequest {
  readonly newEmail: string;
}

export interface ChangePasswordRequest {
  readonly currentPassword: string;
  readonly newPassword: string;
}

export interface ChangePasswordFormValues extends ChangePasswordRequest {
  readonly confirmPassword: string;
}

export interface SignupFormValues extends SignupRequest {
  readonly confirmPassword: string;
}

export interface ChangePrivilegeRequest {
  readonly targetUserEmail: string;
  readonly newLevel: PrivilegeLevel;
  readonly password: string;
}

export interface RecordStewardshipRequest {
  readonly activityDate: moment.Moment;
  readonly stewardshipActivities: string[];
}

export interface EditSiteRequest {
  readonly blockId?: number;
  readonly address: string;
  readonly city: string;
  readonly zip: string;
  readonly lat: number;
  readonly lng: number;
  readonly neighborhoodId: number;
}

export interface UpdateSiteRequest {
  readonly treePresent: boolean | null;
  readonly status: string | null;
  readonly genus: string | null;
  readonly species: string | null;
  readonly commonName: string | null;
  readonly confidence: string | null;
  readonly diameter: number | null;
  readonly circumference: number | null;
  readonly multistem: number | null;
  readonly coverage: string | null;
  readonly pruning: string | null;
  readonly condition: string | null;
  readonly discoloring: string | null;
  readonly leaning: boolean | null;
  readonly constrictingGrate: boolean | null;
  readonly wounds: boolean | null;
  readonly pooling: boolean | null;
  readonly stakesWithWires: boolean | null;
  readonly stakesWithoutWires: boolean | null;
  readonly light: boolean | null;
  readonly bicycle: boolean | null;
  readonly bagEmpty: boolean | null;
  readonly bagFilled: boolean | null;
  readonly tape: boolean | null;
  readonly suckerGrowth: boolean | null;
  readonly siteType: string | null;
  readonly sidewalkWidth: string | null;
  readonly siteWidth: string | null;
  readonly siteLength: string | null;
  readonly material: string | null;
  readonly raisedBed: boolean | null;
  readonly fence: boolean | null;
  readonly trash: boolean | null;
  readonly wires: boolean | null;
  readonly grate: boolean | null;
  readonly stump: boolean | null;
  readonly treeNotes: string | null;
  readonly siteNotes: string | null;
}

export interface AddSiteRequest extends UpdateSiteRequest, EditSiteRequest {}

export interface AddSitesRequest {
  sites: string;
}
