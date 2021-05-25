import { C4CState } from '../../../store';
import { ThunkAction } from 'redux-thunk';
import { SiteActions, ProtectedSiteActions } from './actions';
import { ApiExtraArgs } from '../../../api/apiClient';
import { ProtectedApiExtraArgs } from '../../../api/protectedApiClient';
import { AsyncRequest } from '../../../utils/asyncRequest';

export interface SiteProps {
  siteId: number;
  blockId: number;
  lat: number;
  lng: number;
  city: string;
  zip: string;
  address?: string;
  entries: SiteEntry[];
}

export interface SiteEntry {
  updatedAt: number;
  status?: string;
  genus?: string;
  species?: string;
  commonName?: string;
  confidence?: string;
  diameter?: number;
  circumference?: number;
  coverage?: string;
  pruning?: string;
  condition?: string;
  discoloring?: boolean;
  leaning?: boolean;
  constrictingGrate?: boolean;
  wounds?: boolean;
  pooling?: boolean;
  stakesWith?: boolean;
  stakesWithout?: boolean;
  light?: boolean;
  bicycle?: boolean;
  bagWith?: boolean;
  bagWithout?: boolean;
  tape?: boolean;
  suckerGrowth?: boolean;
  siteType?: string;
  sidewalkWidth?: string;
  siteWidth?: string;
  siteLength?: string;
  material?: string;
  raisedBed?: string;
  fence?: string;
  trash?: string;
  wires?: string;
  grate?: string;
  stump?: string;
  treeNotes?: string;
  siteNotes?: string;
}

export const SiteEntryNames: Record<string, string> = {
  updatedAt: 'Updated At',
  status: 'Status',
  genus: 'Genus',
  species: 'Species',
  commonName: 'Common Name',
  confidence: 'Confidence',
  diameter: 'Diameter',
  circumference: 'Circumference',
  coverage: 'Coverage',
  pruning: 'Pruning',
  condition: 'Condition',
  discoloring: 'Discoloring',
  leaning: 'Leaning',
  constrictingGrate: 'Constricting Grate',
  wounds: 'Wounds',
  pooling: 'Pooling',
  stakesWith: 'Stakes With',
  stakesWithout: 'Stakes Without',
  light: 'Light',
  bicycle: 'Bicycle',
  bagWith: 'Bag With',
  bagWithout: 'Bag Without',
  tape: 'Tape',
  suckerGrowth: 'Sucker Growth',
  siteType: 'Site Type',
  sidewalkWidth: 'Sidewalk Width',
  siteWidth: 'Site Width',
  siteLength: 'Site Length',
  material: 'Material',
  raisedBed: 'Raised Bed',
  fence: 'Fence',
  trash: 'Trash',
  wires: 'Wires',
  grate: 'Grate',
  stump: 'Stump',
  treeNotes: 'Tree Notes',
  siteNotes: 'Site Notes',
};

export interface TreeCare {
  date: string;
  message: string;
}

export interface StewardshipActivities {
  stewardshipActivities: ActivityLog[];
}

export interface Activity {
  watered: boolean;
  mulched: boolean;
  cleaned: boolean;
  weeded: boolean;
}

export interface ActivityRequest extends Activity {
  date: string;
}

export interface ActivityLog extends ActivityRequest {
  id: number;
  userId: number;
}

export interface AdoptedSites {
  adoptedSites: number[];
}

// ---------------------------------Redux----------------------------------------

export interface SiteReducerState {
  readonly siteData: AsyncRequest<SiteProps, any>;
  readonly stewarshipActivityData: AsyncRequest<StewardshipActivities, any>;
}

export interface ProtectedSitesReducerState {
  readonly adoptedSites: AsyncRequest<AdoptedSites, any>;
}

export interface Entry {
  title: string;
  value: string;
}

export type SiteReducerThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ApiExtraArgs,
  SiteActions
>;

export type ProtectedSiteReducerThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ProtectedApiExtraArgs,
  ProtectedSiteActions
>;
