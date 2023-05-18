import { treeCareToMoment } from '../treeFunctions';
import { SiteProps } from '../../containers/treePage/ducks/types';
import { getCommonName } from '../treeFunctions';

test('TreeCare date props to moment date', () => {
  const exampleMoment1 = treeCareToMoment({
    activityId: 0,
    userId: 0,
    month: 'Oct',
    year: 2015,
    day: '15th',
    message: 'Was mulched.',
  });

  expect(exampleMoment1.get('year')).toBe(2015);
  expect(exampleMoment1.get('date')).toBe(15);
  expect(exampleMoment1.get('month')).toBe(9); // months range from 0 to 11

  const exampleMoment2 = treeCareToMoment({
    activityId: 999,
    userId: -10,
    month: 'Jan',
    year: 1999,
    day: '1st',
    message: 'Was cleaned of waste',
  });

  expect(exampleMoment2.get('year')).toBe(1999);
  expect(exampleMoment2.get('date')).toBe(1);
  expect(exampleMoment2.get('month')).toBe(0);
});

const testProps1: SiteProps = {
  siteId: 2355234,
  lat: 324234,
  lng: 234423,
  city: 'Boston',
  zip: '02115',
  address: '21 Forsyth St.',
  neighborhoodId: 241142,
  owner: 'ROW',
  entries: [
    {
      id: 234234,
      updatedAt: 234234,
      commonName: 'White Oak',
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
  owner: 'Federal',
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
  owner: 'Park',
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
  owner: 'State',
  entries: [],
};

describe('tests for the getTreeSpecies function', () => {
  it('correctly returns the species for a tree', () => {
    expect(getCommonName(testProps1)).toBe('White Oak');
    expect(getCommonName(testProps2)).toBe('Pine');
  });
  it("correctly returns 'tree' when the species name is missing", () => {
    expect(getCommonName(testProps3)).toBe('tree');
  });
  it("correctly returns 'tree' when the SiteEntries are empty", () => {
    expect(getCommonName(testProps4)).toBe('tree');
  });
});
