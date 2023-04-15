import { getTreeSpecies } from './index';
import {
  SiteEntry,
  SiteEntryStatus,
  SiteProps,
} from '../../containers/treePage/ducks/types';

const testProps1: SiteProps = {
  siteId: 2355234,
  lat: 324234,
  lng: 234423,
  city: 'Boston',
  zip: '02115',
  address: '21 Forsyth St.',
  neighborhoodId: 241142,
  entries: [
    {
      id: 234234,
      updatedAt: 234234,
      commonName: 'Oak',
    },
  ],
};

const testProps2: SiteProps = {
  siteId: 3463463,
  lat: 324234,
  lng: 234423,
  city: 'Boston',
  zip: '02115',
  address: '21 Forsyth St.',
  neighborhoodId: 241142,
  entries: [
    {
      id: 243234,
      updatedAt: 546456,
      commonName: 'Pine',
    },
  ],
};

const testProps3: SiteProps = {
  siteId: 235356,
  lat: 324234,
  lng: 234423,
  city: 'Boston',
  zip: '02115',
  address: '21 Forsyth St.',
  neighborhoodId: 241142,
  entries: [
    {
      id: 857435,
      updatedAt: 536436,
    },
  ],
};

const testProps4: SiteProps = {
  siteId: 52352,
  lat: 324234,
  lng: 234423,
  city: 'Boston',
  zip: '02115',
  address: '21 Forsyth St.',
  neighborhoodId: 241142,
  entries: [],
};

describe('tests for the getTreeSpecies function', () => {
  it('correctly returns the species for a tree', () => {
    expect(getTreeSpecies(testProps1)).toBe('oak');
    expect(getTreeSpecies(testProps2)).toBe('pine');
  });
  it("correctly returns 'tree' when the species name is missing", () => {
    expect(getTreeSpecies(testProps3)).toBe('tree');
  });
  it("correctly returns 'tree' when the SiteEntries are empty", () => {
    expect(getTreeSpecies(testProps4)).toBe('tree');
  });
});
