import { Neighborhoods } from '../../assets/content';
import { SiteEntry } from '../treePage/ducks/types';

export interface ReviewImageFilters {
  submittedStart: string | null;
  submittedEnd: string | null;
  neighborhoods: Neighborhoods[];
  sites: SiteEntry[]; // TODO: Verify that this is the type we want to parse
}

export interface FilterSiteImagesParams {
  submittedStart: string | null;
  submittedEnd: string | null;
  neighborhoods: number[] | null;
  sites: number[] | null; // TODO: Verify that this is the type we want to parse
}

export interface FilteredSiteImage {
  imageId: number;
  imageUrl: string;
  siteId: number;
  uploaderName: string;
  uploaderEmail: string;
  dateSubmitted: string;
  commonName: string;
  neighborhoodId: number;
  address: string;
}

export interface FilterSiteImagesResponse {
  filteredSites: FilteredSiteImage[];
}
