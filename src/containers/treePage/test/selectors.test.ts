import {
  AsyncRequest,
  AsyncRequestCompleted,
  AsyncRequestNotStarted,
  AsyncRequestFailed,
} from '../../../utils/asyncRequest';
import {
  AdoptedSites,
  StewardshipActivities,
  TreeCare,
  SiteProps,
  SplitSiteEntries,
  Entry,
  MainSiteEntryNames,
  ExtraSiteEntryNames,
} from '../ducks/types';
import {
  mapStewardshipToTreeCare,
  getLatestSplitEntry,
  getLatestEntry,
  isTreeAdoptedByUser,
} from '../ducks/selectors';

describe('Tree Page Selectors', () => {
  describe('mapStewardshipToTreeCare', () => {
    const dummyActivities: StewardshipActivities = {
      stewardshipActivities: [
        {
          id: 0,
          userId: 1,
          date: '01/01/2021',
          watered: true,
          mulched: true,
          cleaned: false,
          weeded: true,
        },
        {
          id: 1,
          userId: 1,
          date: '02/23/2021',
          watered: false,
          mulched: false,
          cleaned: true,
          weeded: false,
        },
      ],
    };

    it('returns correctly formatted strings with different stewardship combinations', () => {
      const expectedTreeCare: TreeCare[] = [
        {
          date: 'Jan 1st',
          message: 'Was mulched and watered and weeded.',
        },
        {
          date: 'Feb 23rd',
          message: 'Was cleared of waste.',
        },
      ];

      const request: AsyncRequest<
        StewardshipActivities,
        any
      > = AsyncRequestCompleted<StewardshipActivities, any>(dummyActivities);

      expect(mapStewardshipToTreeCare(request)).toStrictEqual(expectedTreeCare);
    });

    it('returns empty array if request is not complete', () => {
      const request: AsyncRequest<
        StewardshipActivities,
        any
      > = AsyncRequestFailed<StewardshipActivities, any>(dummyActivities);

      expect(mapStewardshipToTreeCare(request)).toEqual([]);
    });

    it('returns empty array if there are no stewardship activities', () => {
      const emptyActivities: StewardshipActivities = {
        stewardshipActivities: [],
      };

      const request: AsyncRequest<
        StewardshipActivities,
        any
      > = AsyncRequestCompleted<StewardshipActivities, any>(emptyActivities);

      expect(mapStewardshipToTreeCare(request)).toEqual([]);
    });
  });

  const dummySite: SiteProps = {
    neighborhoodId: 0,
    siteId: 0,
    blockId: 1,
    lat: 100,
    lng: 50,
    city: 'beantown',
    zip: '11111',
    address: '1800 place',
    entries: [
      {
        id: 0,
        updatedAt: 200,
        status: 'good',
        species: 'tree',
        genus: 'big',
        circumference: 4,
        bicycle: true,
      },
      {
        id: 1,
        updatedAt: 100,
        status: 'bad',
        species: 'not a tree',
        circumference: 2,
        bicycle: false,
      },
    ],
  };

  describe('getLatestSplitEntry', () => {
    it('returns split entries when request is completed', () => {
      const expectedResponse: SplitSiteEntries = {
        main: [
          {
            title: 'Updated At',
            value: '200',
          },
          {
            title: 'Scientific Name',
            value: 'big tree',
          },
          {
            title: 'Status',
            value: 'good',
          },
        ],
        extra: [
          {
            title: 'Circumference (inches)',
            value: '4',
          },
          {
            title: 'Bicycle tied to tree?',
            value: 'Yes',
          },
        ],
      };

      const splitRequest: AsyncRequest<SiteProps, any> = AsyncRequestCompleted<
        SiteProps,
        any
      >(dummySite);

      expect(getLatestSplitEntry(splitRequest)).toStrictEqual(expectedResponse);
    });

    it('returns empty arrays when site props have not been loaded', () => {
      const splitRequest: AsyncRequest<
        SiteProps,
        any
      > = AsyncRequestNotStarted();

      expect(getLatestSplitEntry(splitRequest)).toStrictEqual({
        main: [],
        extra: [],
      });
    });
  });

  describe('getLatestEntry', () => {
    it('returns main entries when request is completed', () => {
      const expectedMainResponse: Entry[] = [
        {
          title: 'Updated At',
          value: '200',
        },
        {
          title: 'Status',
          value: 'good',
        },
        {
          title: 'Species',
          value: 'tree',
        },
        {
          title: 'Genus',
          value: 'big',
        },
      ];

      const entryRequest: AsyncRequest<SiteProps, any> = AsyncRequestCompleted<
        SiteProps,
        any
      >(dummySite);

      expect(getLatestEntry(entryRequest, MainSiteEntryNames)).toStrictEqual(
        expectedMainResponse,
      );
    });

    it('returns extra entries when request is completed', () => {
      const expectedExtraResponse: Entry[] = [
        {
          title: 'Circumference (inches)',
          value: '4',
        },
        {
          title: 'Bicycle tied to tree?',
          value: 'Yes',
        },
      ];

      const entryRequest: AsyncRequest<SiteProps, any> = AsyncRequestCompleted<
        SiteProps,
        any
      >(dummySite);

      expect(getLatestEntry(entryRequest, ExtraSiteEntryNames)).toStrictEqual(
        expectedExtraResponse,
      );
    });

    it('returns empty arrays when site props have not been loaded', () => {
      const splitRequest: AsyncRequest<
        SiteProps,
        any
      > = AsyncRequestNotStarted();

      expect(getLatestSplitEntry(splitRequest)).toStrictEqual({
        main: [],
        extra: [],
      });
    });
  });

  describe('isTreeAdoptedByUser', () => {
    const dummyAdoptedSites: AdoptedSites = {
      adoptedSites: [0, 1, 3],
    };

    it('returns true when the user has adopted the given site and request is completed', () => {
      const isAdoptedRequest: AsyncRequest<
        AdoptedSites,
        any
      > = AsyncRequestCompleted<AdoptedSites, any>(dummyAdoptedSites);

      expect(isTreeAdoptedByUser(isAdoptedRequest, 3)).toBe(true);
    });

    it('returns false when the user has not adopted tree', () => {
      const isAdoptedRequest: AsyncRequest<
        AdoptedSites,
        any
      > = AsyncRequestCompleted<AdoptedSites, any>(dummyAdoptedSites);

      expect(isTreeAdoptedByUser(isAdoptedRequest, 2)).toBe(false);
    });

    it('returns false when use has no adopted sites', () => {
      const emptyAdoptedSites: AdoptedSites = {
        adoptedSites: [],
      };

      const isAdoptedRequest: AsyncRequest<
        AdoptedSites,
        any
      > = AsyncRequestCompleted<AdoptedSites, any>(emptyAdoptedSites);

      expect(isTreeAdoptedByUser(isAdoptedRequest, 0)).toBe(false);
    });

    it('returns false when request is not completed', () => {
      const isAdoptedRequest: AsyncRequest<
        AdoptedSites,
        any
      > = AsyncRequestNotStarted<AdoptedSites, any>();

      expect(isTreeAdoptedByUser(isAdoptedRequest, 0)).toBe(false);
    });
  });
});
