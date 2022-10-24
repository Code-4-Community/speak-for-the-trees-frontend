import { C4CState } from '../../../store';
import { ThunkAction } from 'redux-thunk';
import { ProtectedSiteActions, SiteActions } from './actions';
import { ApiExtraArgs } from '../../../api/apiClient';
import { ProtectedApiExtraArgs } from '../../../api/protectedApiClient';
import { AsyncRequest } from '../../../utils/asyncRequest';

export interface SiteProps {
  siteId: number;
  blockId?: number;
  lat: number;
  lng: number;
  city: string;
  zip: string;
  address?: string;
  neighborhoodId: number;
  entries: SiteEntry[];
}

export enum UneditableSiteEntryFields {
  UPDATED_AT = 'updatedAt',
}

export enum EditableSiteEntryFields {
  STATUS = 'status',
  GENUS = 'genus',
  SPECIES = 'species',
  COMMON_NAME = 'commonName',
  CONFIDENCE = 'confidence',
  DIAMETER = 'diameter',
  CIRCUMFERENCE = 'circumference',
  MULTISTEM = 'multistem',
  COVERAGE = 'coverage',
  PRUNING = 'pruning',
  CONDITION = 'condition',
  DISCOLORING = 'discoloring',
  LEANING = 'leaning',
  CONSTRICTING_GRATE = 'constrictingGrate',
  WOUNDS = 'wounds',
  POOLING = 'pooling',
  STAKES_WITH_WIRES = 'stakesWithWires',
  STAKES_WITHOUT_WIRES = 'stakesWithoutWires',
  LIGHT = 'light',
  BICYCLE = 'bicycle',
  BAG_EMPTY = 'bagEmpty',
  BAG_FILLED = 'bagFilled',
  TAPE = 'tape',
  SUCKER_GROWTH = 'suckerGrowth',
  TREE_PRESENT = 'treePresent',
  SITE_TYPE = 'siteType',
  SIDEWALK_WIDTH = 'sidewalkWidth',
  SITE_WIDTH = 'siteWidth',
  SITE_LENGTH = 'siteLength',
  MATERIAL = 'material',
  RAISED_BED = 'raisedBed',
  FENCE = 'fence',
  TRASH = 'trash',
  WIRES = 'wires',
  GRATE = 'grate',
  STUMP = 'stump',
  TREE_NOTES = 'treeNotes',
  SITE_NOTES = 'siteNotes',
}

export type SiteEntryField =
  | UneditableSiteEntryFields
  | EditableSiteEntryFields;
export const SiteEntryFields = {
  ...UneditableSiteEntryFields,
  ...EditableSiteEntryFields,
};

export interface SiteEntry {
  id: number;
  updatedAt: number;
  status?: string;
  genus?: string;
  species?: string;
  commonName?: string;
  confidence?: string;
  diameter?: number;
  circumference?: number;
  multistem?: boolean;
  coverage?: string;
  pruning?: string;
  condition?: string;
  discoloring?: boolean;
  leaning?: boolean;
  constrictingGrate?: boolean;
  wounds?: boolean;
  pooling?: boolean;
  stakesWithWires?: boolean;
  stakesWithoutWires?: boolean;
  light?: boolean;
  bicycle?: boolean;
  bagEmpty?: boolean;
  bagFilled?: boolean;
  tape?: boolean;
  suckerGrowth?: boolean;
  treePresent?: boolean;
  siteType?: string;
  sidewalkWidth?: string;
  siteWidth?: number;
  siteLength?: number;
  material?: string;
  raisedBed?: boolean;
  fence?: boolean;
  trash?: boolean;
  wires?: boolean;
  grate?: boolean;
  stump?: boolean;
  treeNotes?: string;
  siteNotes?: string;
  treeName?: string;
  adopter?: string;
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

export const MainSiteEntryOrder: Record<string, number> = {
  'Updated At': 1,
  'Common Name': 2,
  Genus: 3,
  Species: 4,
  'Scientific Name': 3,
  'Diameter at Breast Height (inches)': 5,
  Status: 6,
};

export const ExtraSiteEntryNames: Record<string, string> = {
  treePresent: 'Is there a tree present?',
  confidence: 'Confidence',
  circumference: 'Circumference (inches)',
  multistem: 'Multistem?',
  coverage: 'Coverage',
  pruning: 'Amount of Pruning',
  condition: 'Condition',
  discoloring: 'Discolored leaves?',
  leaning: 'Is the tree leaning?',
  constrictingGrate: 'Constricting Grate',
  wounds: 'Trunk wounds?',
  pooling: 'Pooling water?',
  stakesWithWires: 'Has stakes with wires?',
  stakesWithoutWires: 'Has stakes without wires?',
  light: 'Lights around tree?',
  bicycle: 'Bicycle tied to tree?',
  bagEmpty: 'Has an empty bag?',
  bagFilled: 'Has a filled bag?',
  tape: 'Tape on tree?',
  suckerGrowth: 'Is there sucker growth?',
  siteType: 'Site Type',
  sidewalkWidth: 'Sidewalk Width',
  siteWidth: 'Site Width (inches)',
  siteLength: 'Site Length (inches)',
  material: 'Material in Pit',
  raisedBed: 'Is there a raised bed?',
  fence: 'Is there a fence?',
  trash: 'Is there trash?',
  wires: 'Are there wires overhead?',
  grate: 'Is there a grate around the tree base?',
  stump: 'Is there a stump?',
  treeNotes: 'Tree Notes',
  siteNotes: 'Site Notes',
};

export interface TreeCare {
  month: string;
  year: number;
  day: string;
  message: string;
}

export interface MonthYearOption {
  month: string;
  year: number;
}

export interface StewardshipActivities {
  stewardshipActivities: ActivityLog[];
}

// Invariant: At least one of these booleans will always be true
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
  readonly stewardshipActivityData: AsyncRequest<StewardshipActivities, any>;
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
