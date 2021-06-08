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

export interface SplitSiteEntries {
  main: Entry[];
  extra: Entry[];
}

export const MainSiteEntryNames: Record<string, string> = {
  updatedAt: 'Updated At',
  status: 'Status',
  genus: 'Genus',
  species: 'Species',
  commonName: 'Common Name',
  diameter: 'Diameter at Breast Height (inches)',
};

export const ExtraSiteEntryNames: Record<string, string> = {
  confidence: 'Confidence',
  circumference: 'Circumference',
  coverage: 'Coverage',
  pruning: 'Amount of Pruning',
  condition: 'Condition',
  discoloring: 'Discolored leaves?',
  leaning: 'Is the tree leaning?',
  constrictingGrate: 'Constricting Grate',
  wounds: 'Trunk wounds?',
  pooling: 'Pooling water?',
  stakesWith: 'Stakes With',
  stakesWithout: 'Stakes Without',
  light: 'Lights around tree?',
  bicycle: 'Bicycle tied to tree?',
  bagWith: 'Bag With',
  bagWithout: 'Bag Without',
  tape: 'Tape on tree?',
  suckerGrowth: 'Is there sucker growth?',
  siteType: 'Site Type',
  sidewalkWidth: 'Sidewalk Width',
  siteWidth: 'Site Width (in inches)',
  siteLength: 'Site Length (in inches)',
  material: 'Material in Pit',
  raisedBed: 'Is there a raised bed?',
  fence: 'Is there a fence?',
  trash: 'Is there trash?',
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
