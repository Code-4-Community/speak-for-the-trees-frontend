import { C4CState } from '../../../store';
import { ThunkAction } from 'redux-thunk';
import { ProtectedSiteActions, SiteActions } from './actions';
import { ApiExtraArgs } from '../../../api/apiClient';
import { ProtectedApiExtraArgs } from '../../../api/protectedApiClient';
import { AsyncRequest } from '../../../utils/asyncRequest';
import i18n from '../../../i18n/i18n';

const t = i18n.t;

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
  status?: SiteEntryStatus;
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

export enum SiteEntryStatus {
  ALIVE = 'Alive',
  DEAD = 'Dead',
  DEAD_BUT_STANDING = 'Dead but standing',
}

export interface SplitSiteEntries {
  main: Entry[];
  extra: Entry[];
}

export const MainSiteEntryNames: Record<string, string> = {
  updatedAt: t('main.updatedAt', { ns: 'treeInfoTypes' }),
  status: t('main.status', { ns: 'treeInfoTypes' }),
  genus: t('main.genus', { ns: 'treeInfoTypes' }),
  species: t('main.species', { ns: 'treeInfoTypes' }),
  commonName: t('main.commonName', { ns: 'treeInfoTypes' }),
  diameter: t('main.diameter', { ns: 'treeInfoTypes' }),
};

export const MainSiteEntryOrder: Record<string, number> = {
  [t('main.updatedAt', { ns: 'treeInfoTypes' })]: 1,
  [t('main.commonName', { ns: 'treeInfoTypes' })]: 2,
  [t('main.genus', { ns: 'treeInfoTypes' })]: 3,
  [t('main.species', { ns: 'treeInfoTypes' })]: 4,
  [t('main.scientificName', { ns: 'treeInfoTypes' })]: 3,
  [t('main.diameter', { ns: 'treeInfoTypes' })]: 5,
  [t('main.status', { ns: 'treeInfoTypes' })]: 6,
};

export const ExtraSiteEntryNames: Record<string, string> = {
  treePresent: t('extra.treePresent', { ns: 'treeInfoTypes' }),
  confidence: t('extra.confidence', { ns: 'treeInfoTypes' }),
  circumference: t('extra.circumference', { ns: 'treeInfoTypes' }),
  multistem: t('extra.multistem', { ns: 'treeInfoTypes' }),
  coverage: t('extra.coverage', { ns: 'treeInfoTypes' }),
  pruning: t('extra.pruning', { ns: 'treeInfoTypes' }),
  condition: t('extra.condition', { ns: 'treeInfoTypes' }),
  discoloring: t('extra.discoloring', { ns: 'treeInfoTypes' }),
  leaning: t('extra.leaning', { ns: 'treeInfoTypes' }),
  constrictingGrate: t('extra.constrictingGrate', { ns: 'treeInfoTypes' }),
  wounds: t('extra.wounds', { ns: 'treeInfoTypes' }),
  pooling: t('extra.pooling', { ns: 'treeInfoTypes' }),
  stakesWithWires: t('extra.stakesWithWires', { ns: 'treeInfoTypes' }),
  stakesWithoutWires: t('extra.stakesWithoutWires', { ns: 'treeInfoTypes' }),
  light: t('extra.light', { ns: 'treeInfoTypes' }),
  bicycle: t('extra.bicycle', { ns: 'treeInfoTypes' }),
  bagEmpty: t('extra.bagEmpty', { ns: 'treeInfoTypes' }),
  bagFilled: t('extra.bagFilled', { ns: 'treeInfoTypes' }),
  tape: t('extra.tape', { ns: 'treeInfoTypes' }),
  suckerGrowth: t('extra.suckerGrowth', { ns: 'treeInfoTypes' }),
  siteType: t('extra.siteType', { ns: 'treeInfoTypes' }),
  sidewalkWidth: t('extra.sidewalkWidth', { ns: 'treeInfoTypes' }),
  siteWidth: t('extra.siteWidth', { ns: 'treeInfoTypes' }),
  siteLength: t('extra.siteLength', { ns: 'treeInfoTypes' }),
  material: t('extra.material', { ns: 'treeInfoTypes' }),
  raisedBed: t('extra.raisedBed', { ns: 'treeInfoTypes' }),
  fence: t('extra.fence', { ns: 'treeInfoTypes' }),
  trash: t('extra.trash', { ns: 'treeInfoTypes' }),
  wires: t('extra.wires', { ns: 'treeInfoTypes' }),
  grate: t('extra.grate', { ns: 'treeInfoTypes' }),
  stump: t('extra.stump', { ns: 'treeInfoTypes' }),
  treeNotes: t('extra.treeNotes', { ns: 'treeInfoTypes' }),
  siteNotes: t('extra.siteNotes', { ns: 'treeInfoTypes' }),
};

export interface TreeCare {
  activityId: number;
  userId: number;
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
