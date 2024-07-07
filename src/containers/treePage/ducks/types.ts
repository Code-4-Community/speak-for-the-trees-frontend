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

enum DeleteEntryField {
  DELETE_ENTRY = 'deleteEntry',
}

export type SiteEntryField =
  | UneditableSiteEntryFields
  | EditableSiteEntryFields
  | EditEntryField
  | DeleteEntryField;

export const SiteEntryFields = {
  ...EditEntryField,
  ...DeleteEntryField,
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
  createdAt: t('main.createdAt', { ns: 'types' }),
  status: t('main.status', { ns: 'types' }),
  genus: t('main.genus', { ns: 'types' }),
  species: t('main.species', { ns: 'types' }),
  commonName: t('main.commonName', { ns: 'types' }),
  diameter: t('main.diameter', { ns: 'types' }),
};

export const MainSiteEntryOrder: Record<string, number> = {
  [t('main.createdAt', { ns: 'types' })]: 1,
  [t('main.commonName', { ns: 'types' })]: 2,
  [t('main.genus', { ns: 'types' })]: 3,
  [t('main.species', { ns: 'types' })]: 4,
  [t('main.scientificName', { ns: 'types' })]: 3,
  [t('main.diameter', { ns: 'types' })]: 5,
  [t('main.status', { ns: 'types' })]: 6,
};

export const ExtraSiteEntryNames: Record<string, string> = {
  // SFTT
  treePresent: t('sftt.treePresent', { ns: 'types' }),
  updatedAt: t('sftt.updatedAt', { ns: 'types' }),
  confidence: t('sftt.confidence', { ns: 'types' }),
  circumference: t('sftt.circumference', { ns: 'types' }),
  multistem: t('sftt.multistem', { ns: 'types' }),
  coverage: t('sftt.coverage', { ns: 'types' }),
  pruning: t('sftt.pruning', { ns: 'types' }),
  condition: t('sftt.condition', { ns: 'types' }),
  discoloring: t('sftt.discoloring', { ns: 'types' }),
  leaning: t('sftt.leaning', { ns: 'types' }),
  constrictingGrate: t('sftt.constrictingGrate', { ns: 'types' }),
  wounds: t('sftt.wounds', { ns: 'types' }),
  pooling: t('sftt.pooling', { ns: 'types' }),
  stakesWithWires: t('sftt.stakesWithWires', { ns: 'types' }),
  stakesWithoutWires: t('sftt.stakesWithoutWires', { ns: 'types' }),
  light: t('sftt.light', { ns: 'types' }),
  bicycle: t('sftt.bicycle', { ns: 'types' }),
  bagEmpty: t('sftt.bagEmpty', { ns: 'types' }),
  bagFilled: t('sftt.bagFilled', { ns: 'types' }),
  tape: t('sftt.tape', { ns: 'types' }),
  suckerGrowth: t('sftt.suckerGrowth', { ns: 'types' }),
  siteType: t('sftt.siteType', { ns: 'types' }),
  sidewalkWidth: t('sftt.sidewalkWidth', { ns: 'types' }),
  siteWidth: t('sftt.siteWidth', { ns: 'types' }),
  siteLength: t('sftt.siteLength', { ns: 'types' }),
  material: t('sftt.material', { ns: 'types' }),
  raisedBed: t('sftt.raisedBed', { ns: 'types' }),
  fence: t('sftt.fence', { ns: 'types' }),
  trash: t('sftt.trash', { ns: 'types' }),
  wires: t('sftt.wires', { ns: 'types' }),
  grate: t('sftt.grate', { ns: 'types' }),
  stump: t('sftt.stump', { ns: 'types' }),
  treeNotes: t('sftt.treeNotes', { ns: 'types' }),
  siteNotes: t('sftt.siteNotes', { ns: 'types' }),
  plantingDate: t('sftt.plantingDate', { ns: 'types' }),
  editEntry: t('sftt.editEntry', { ns: 'types' }),
  deleteEntry: t('sftt.deleteEntry', { ns: 'types' }),
  // CAMBRIDGE
  trunks: t('cambridge.trunks', { ns: 'types' }),
  speciesShort: t('cambridge.speciesShort', { ns: 'types' }),
  location: t('cambridge.location', { ns: 'types' }),
  siteRetiredReason: t('cambridge.siteRetiredReason', { ns: 'types' }),
  inspectr: t('cambridge.inspectr', { ns: 'types' }),
  abutsOpenArea: t('cambridge.abutsOpenArea', { ns: 'types' }),
  treeWellCover: t('cambridge.treeWellCover', { ns: 'types' }),
  treeGrateActionReq: t('cambridge.treeGrateActionReq', {
    ns: 'types',
  }),
  globalId: t('cambridge.globalId', { ns: 'types' }),
  pb: t('cambridge.pb', { ns: 'types' }),
  siteReplanted: t('cambridge.siteReplanted', { ns: 'types' }),
  overheadWires: t('cambridge.overheadWires', { ns: 'types' }),
  ownership: t('cambridge.ownership', { ns: 'types' }),
  scheduledRemoval: t('cambridge.scheduledRemoval', { ns: 'types' }),
  structuralSoil: t('cambridge.structuralSoil', { ns: 'types' }),
  wateringResponsibility: t('cambridge.wateringResponsibility', {
    ns: 'types',
  }),
  cultivar: t('cambridge.cultivar', { ns: 'types' }),
  solarRating: t('cambridge.solarRating', { ns: 'types' }),
  bareRoot: t('cambridge.bareRoot', { ns: 'types' }),
  adaCompliant: t('cambridge.adaCompliant', { ns: 'types' }),
  cartegraphPlantDate: t('cambridge.cartegraphPlantDate', {
    ns: 'types',
  }),
  locationRetired: t('cambridge.locationRetired', { ns: 'types' }),
  createdDate: t('cambridge.createdDate', { ns: 'types' }),
  order: t('cambridge.order', { ns: 'types' }),
  plantingSeason: t('cambridge.plantingSeason', { ns: 'types' }),
  exposedRootFlare: t('cambridge.exposedRootFlare', { ns: 'types' }),
  stTreePruningZone: t('cambridge.stTreePruningZone', { ns: 'types' }),
  memTree: t('cambridge.memTree', { ns: 'types' }),
  cartegraphRetireDate: t('cambridge.cartegraphRetireDate', {
    ns: 'types',
  }),
  removalReason: t('cambridge.removalReason', { ns: 'types' }),
  offStTreePruningZone: t('cambridge.offStTreePruningZone', {
    ns: 'types',
  }),
  plantingContract: t('cambridge.plantingContract', { ns: 'types' }),
  treeWellDepth: t('cambridge.treeWellDepth', { ns: 'types' }),
  removalDate: t('cambridge.removalDate', { ns: 'types' }),
  scientificName: t('cambridge.scientificName', { ns: 'types' }),
  biocharAdded: t('cambridge.biocharAdded', { ns: 'types' }),
  lastEditedUser: t('cambridge.lastEditedUser', { ns: 'types' }),
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

export interface ReportSiteRequest {
  reason: string;
  description: string;
}

export interface AdoptedSites {
  adoptedSites: number[];
}

export interface SiteEntryImage {
  imageId: number;
  uploaderUsername: string;
  uploadedAt: string;
  imageUrl: string;
  uploaderId: number;
}

export interface TreeBenefits {
  energy: number | null;
  energyMoney: number | null;
  stormwater: number | null;
  stormwaterMoney: number | null;
  airQuality: number | null;
  airQualityMoney: number | null;
  co2Removed: number | null;
  co2RemovedMoney: number | null;
  co2Stored: number | null;
  co2StoredMoney: number | null;
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
