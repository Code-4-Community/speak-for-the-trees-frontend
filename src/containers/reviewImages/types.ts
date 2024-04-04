import { Neighborhoods } from '../../assets/content';

export interface ReviewImageFilters {
  submittedStart: string | null;
  submittedEnd: string | null;
  neighborhoods: Neighborhoods[];
  siteIds: number[]; // TODO: Verify that this is the type we want to parse
}

export interface FilterSiteImagesParams {
  submittedStart: string | null;
  submittedEnd: string | null;
  neighborhoods: number[] | null;
  siteIds: number[] | null; // TODO: Verify that this is the type we want to parse
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
