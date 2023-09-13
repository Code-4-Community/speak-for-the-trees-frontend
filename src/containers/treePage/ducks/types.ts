import { C4CState } from '../../../store';
import { ThunkAction } from 'redux-thunk';
import { ProtectedSiteActions, SiteActions } from './actions';
import { ApiExtraArgs } from '../../../api/apiClient';
import { ProtectedApiExtraArgs } from '../../../api/protectedApiClient';
import { AsyncRequest } from '../../../utils/asyncRequest';
import i18n from '../../../i18n/i18n';
import { SiteOwner } from '../../../components/mapComponents/constants';

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
  owner: SiteOwner;
  entries: SiteEntry[];
}

export enum UneditableSiteEntryFields {
  CREATED_AT = 'createdAt',
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
  PLANTING_DATE = 'plantingDate',
}

enum EditEntryField {
  EDIT_ENTRY = 'editEntry',
}

export type SiteEntryField =
  | UneditableSiteEntryFields
  | EditableSiteEntryFields
  | EditEntryField;

export const SiteEntryFields = {
  ...EditEntryField,
  ...UneditableSiteEntryFields,
  ...EditableSiteEntryFields,
};

export interface SiteEntry {
  id: number;
  createdAt: number;
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
  plantingDate?: moment.Moment;
  images: SiteEntryImage[];
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
  createdAt: t('main.createdAt', { ns: 'treeInfoTypes' }),
  status: t('main.status', { ns: 'treeInfoTypes' }),
  genus: t('main.genus', { ns: 'treeInfoTypes' }),
  species: t('main.species', { ns: 'treeInfoTypes' }),
  commonName: t('main.commonName', { ns: 'treeInfoTypes' }),
  diameter: t('main.diameter', { ns: 'treeInfoTypes' }),
};

export const MainSiteEntryOrder: Record<string, number> = {
  [t('main.createdAt', { ns: 'treeInfoTypes' })]: 1,
  [t('main.commonName', { ns: 'treeInfoTypes' })]: 2,
  [t('main.genus', { ns: 'treeInfoTypes' })]: 3,
  [t('main.species', { ns: 'treeInfoTypes' })]: 4,
  [t('main.scientificName', { ns: 'treeInfoTypes' })]: 3,
  [t('main.diameter', { ns: 'treeInfoTypes' })]: 5,
  [t('main.status', { ns: 'treeInfoTypes' })]: 6,
};

export const ExtraSiteEntryNames: Record<string, string> = {
  // SFTT
  treePresent: t('sftt.treePresent', { ns: 'treeInfoTypes' }),
  updatedAt: t('sftt.updatedAt', { ns: 'treeInfoTypes' }),
  confidence: t('sftt.confidence', { ns: 'treeInfoTypes' }),
  circumference: t('sftt.circumference', { ns: 'treeInfoTypes' }),
  multistem: t('sftt.multistem', { ns: 'treeInfoTypes' }),
  coverage: t('sftt.coverage', { ns: 'treeInfoTypes' }),
  pruning: t('sftt.pruning', { ns: 'treeInfoTypes' }),
  condition: t('sftt.condition', { ns: 'treeInfoTypes' }),
  discoloring: t('sftt.discoloring', { ns: 'treeInfoTypes' }),
  leaning: t('sftt.leaning', { ns: 'treeInfoTypes' }),
  constrictingGrate: t('sftt.constrictingGrate', { ns: 'treeInfoTypes' }),
  wounds: t('sftt.wounds', { ns: 'treeInfoTypes' }),
  pooling: t('sftt.pooling', { ns: 'treeInfoTypes' }),
  stakesWithWires: t('sftt.stakesWithWires', { ns: 'treeInfoTypes' }),
  stakesWithoutWires: t('sftt.stakesWithoutWires', { ns: 'treeInfoTypes' }),
  light: t('sftt.light', { ns: 'treeInfoTypes' }),
  bicycle: t('sftt.bicycle', { ns: 'treeInfoTypes' }),
  bagEmpty: t('sftt.bagEmpty', { ns: 'treeInfoTypes' }),
  bagFilled: t('sftt.bagFilled', { ns: 'treeInfoTypes' }),
  tape: t('sftt.tape', { ns: 'treeInfoTypes' }),
  suckerGrowth: t('sftt.suckerGrowth', { ns: 'treeInfoTypes' }),
  siteType: t('sftt.siteType', { ns: 'treeInfoTypes' }),
  sidewalkWidth: t('sftt.sidewalkWidth', { ns: 'treeInfoTypes' }),
  siteWidth: t('sftt.siteWidth', { ns: 'treeInfoTypes' }),
  siteLength: t('sftt.siteLength', { ns: 'treeInfoTypes' }),
  material: t('sftt.material', { ns: 'treeInfoTypes' }),
  raisedBed: t('sftt.raisedBed', { ns: 'treeInfoTypes' }),
  fence: t('sftt.fence', { ns: 'treeInfoTypes' }),
  trash: t('sftt.trash', { ns: 'treeInfoTypes' }),
  wires: t('sftt.wires', { ns: 'treeInfoTypes' }),
  grate: t('sftt.grate', { ns: 'treeInfoTypes' }),
  stump: t('sftt.stump', { ns: 'treeInfoTypes' }),
  treeNotes: t('sftt.treeNotes', { ns: 'treeInfoTypes' }),
  siteNotes: t('sftt.siteNotes', { ns: 'treeInfoTypes' }),
  plantingDate: t('sftt.plantingDate', { ns: 'treeInfoTypes' }),
  editEntry: t('sftt.editEntry', { ns: 'treeInfoTypes' }),
  // CAMBRIDGE
  trunks: t('cambridge.trunks', { ns: 'treeInfoTypes' }),
  speciesShort: t('cambridge.speciesShort', { ns: 'treeInfoTypes' }),
  location: t('cambridge.location', { ns: 'treeInfoTypes' }),
  siteRetiredReason: t('cambridge.siteRetiredReason', { ns: 'treeInfoTypes' }),
  inspectr: t('cambridge.inspectr', { ns: 'treeInfoTypes' }),
  abutsOpenArea: t('cambridge.abutsOpenArea', { ns: 'treeInfoTypes' }),
  treeWellCover: t('cambridge.treeWellCover', { ns: 'treeInfoTypes' }),
  treeGrateActionReq: t('cambridge.treeGrateActionReq', {
    ns: 'treeInfoTypes',
  }),
  globalId: t('cambridge.globalId', { ns: 'treeInfoTypes' }),
  pb: t('cambridge.pb', { ns: 'treeInfoTypes' }),
  siteReplanted: t('cambridge.siteReplanted', { ns: 'treeInfoTypes' }),
  overheadWires: t('cambridge.overheadWires', { ns: 'treeInfoTypes' }),
  ownership: t('cambridge.ownership', { ns: 'treeInfoTypes' }),
  scheduledRemoval: t('cambridge.scheduledRemoval', { ns: 'treeInfoTypes' }),
  structuralSoil: t('cambridge.structuralSoil', { ns: 'treeInfoTypes' }),
  wateringResponsibility: t('cambridge.wateringResponsibility', {
    ns: 'treeInfoTypes',
  }),
  cultivar: t('cambridge.cultivar', { ns: 'treeInfoTypes' }),
  solarRating: t('cambridge.solarRating', { ns: 'treeInfoTypes' }),
  bareRoot: t('cambridge.bareRoot', { ns: 'treeInfoTypes' }),
  adaCompliant: t('cambridge.adaCompliant', { ns: 'treeInfoTypes' }),
  cartegraphPlantDate: t('cambridge.cartegraphPlantDate', {
    ns: 'treeInfoTypes',
  }),
  locationRetired: t('cambridge.locationRetired', { ns: 'treeInfoTypes' }),
  createdDate: t('cambridge.createdDate', { ns: 'treeInfoTypes' }),
  order: t('cambridge.order', { ns: 'treeInfoTypes' }),
  plantingSeason: t('cambridge.plantingSeason', { ns: 'treeInfoTypes' }),
  exposedRootFlare: t('cambridge.exposedRootFlare', { ns: 'treeInfoTypes' }),
  stTreePruningZone: t('cambridge.stTreePruningZone', { ns: 'treeInfoTypes' }),
  memTree: t('cambridge.memTree', { ns: 'treeInfoTypes' }),
  cartegraphRetireDate: t('cambridge.cartegraphRetireDate', {
    ns: 'treeInfoTypes',
  }),
  removalReason: t('cambridge.removalReason', { ns: 'treeInfoTypes' }),
  offStTreePruningZone: t('cambridge.offStTreePruningZone', {
    ns: 'treeInfoTypes',
  }),
  plantingContract: t('cambridge.plantingContract', { ns: 'treeInfoTypes' }),
  treeWellDepth: t('cambridge.treeWellDepth', { ns: 'treeInfoTypes' }),
  removalDate: t('cambridge.removalDate', { ns: 'treeInfoTypes' }),
  scientificName: t('cambridge.scientificName', { ns: 'treeInfoTypes' }),
  biocharAdded: t('cambridge.biocharAdded', { ns: 'treeInfoTypes' }),
  lastEditedUser: t('cambridge.lastEditedUser', { ns: 'treeInfoTypes' }),
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
  installedWateringBag: boolean;
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

export interface SiteEntryImage {
  imageId: number;
  uploaderUsername: string;
  uploadedAt: string;
  imageUrl: string;
}

export interface TreeBenefits {
  energy: number;
  energyMoney: number;
  stormwater: number;
  stormwaterMoney: number;
  airQuality: number;
  airQualityMoney: number;
  co2Removed: number;
  co2RemovedMoney: number;
  co2Stored: number;
  co2StoredMoney: number;
}

export enum TreeBenefitCategory {
  ENERGY = 'energy',
  STORMWATER = 'stormwater',
  AIR_QUALITY = 'airQuality',
  CO2_REMOVED = 'co2Removed',
  CO2_STORED = 'co2Stored',
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
