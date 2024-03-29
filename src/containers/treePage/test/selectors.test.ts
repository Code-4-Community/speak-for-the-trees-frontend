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
  MonthYearOption,
  SiteEntryStatus,
  SiteEntryImage,
} from '../ducks/types';
import {
  mapStewardshipToTreeCare,
  getLatestSplitEntry,
  getLatestEntry,
  isTreeAdoptedByUser,
  mapStewardshipToMonthYearOptions,
  getLatestEntrySiteImages,
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
          installedWateringBag: false,
        },
        {
          id: 1,
          userId: 1,
          date: '02/23/2021',
          watered: false,
          mulched: false,
          cleaned: true,
          weeded: false,
          installedWateringBag: true,
        },
      ],
    };

    it('returns correctly formatted strings with different stewardship combinations', () => {
      const expectedTreeCare: TreeCare[] = [
        {
          activityId: 0,
          userId: 1,
          day: '1st',
          month: 'Jan',
          year: 2021,
          message: 'Was mulched, watered, and weeded.',
        },
        {
          activityId: 1,
          userId: 1,
          day: '23rd',
          month: 'Feb',
          year: 2021,
          message: 'Was cleared of waste and provided a watering bag.',
        },
      ];

      const request: AsyncRequest<StewardshipActivities, any> =
        AsyncRequestCompleted<StewardshipActivities, any>(dummyActivities);

      expect(mapStewardshipToTreeCare(request)).toStrictEqual(expectedTreeCare);
    });

    it('returns empty array if request is not complete', () => {
      const request: AsyncRequest<StewardshipActivities, any> =
        AsyncRequestFailed<StewardshipActivities, any>(dummyActivities);

      expect(mapStewardshipToTreeCare(request)).toEqual([]);
    });

    it('returns empty array if there are no stewardship activities', () => {
      const emptyActivities: StewardshipActivities = {
        stewardshipActivities: [],
      };

      const request: AsyncRequest<StewardshipActivities, any> =
        AsyncRequestCompleted<StewardshipActivities, any>(emptyActivities);

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
    owner: 'ROW',
    entries: [
      {
        id: 0,
        createdAt: 200,
        updatedAt: 200,
        status: SiteEntryStatus.ALIVE,
        species: 'tree',
        genus: 'big',
        circumference: 4,
        bicycle: true,
        images: [
          {
            imageId: 1,
            imageUrl: 'http://www.some-address.com',
            uploadedAt: '09/06/2023',
            uploaderUsername: 'First Last',
            uploaderId: 1,
          },
          {
            imageId: 2,
            imageUrl: 'http://www.some-other-address.com',
            uploadedAt: '01/01/2023',
            uploaderUsername: 'Hello World',
            uploaderId: 2,
          },
        ],
      },
      {
        id: 1,
        createdAt: 100,
        updatedAt: 100,
        status: SiteEntryStatus.DEAD,
        species: 'not a tree',
        circumference: 2,
        bicycle: false,
        images: [
          {
            imageId: 3,
            imageUrl: 'http://www.should-not-be-returned.com',
            uploadedAt: '01/01/2022',
            uploaderUsername: 'Code4Community',
            uploaderId: 1,
          },
        ],
      },
    ],
  };

  describe('getLatestSplitEntry', () => {
    it('returns split entries when request is completed', () => {
      const expectedResponse: SplitSiteEntries = {
        main: [
          {
            title: 'Created At',
            value: '200',
          },
          {
            title: 'Scientific Name',
            value: 'big tree',
          },
          {
            title: 'Status',
            value: SiteEntryStatus.ALIVE,
          },
        ],
        extra: [
          {
            title: 'Updated At',
            value: '200',
          },
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
      const splitRequest: AsyncRequest<SiteProps, any> =
        AsyncRequestNotStarted();

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
          title: 'Created At',
          value: '200',
        },
        {
          title: 'Status',
          value: SiteEntryStatus.ALIVE,
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
          title: 'Updated At',
          value: '200',
        },
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
      const splitRequest: AsyncRequest<SiteProps, any> =
        AsyncRequestNotStarted();

      expect(getLatestSplitEntry(splitRequest)).toStrictEqual({
        main: [],
        extra: [],
      });
    });
  });

  describe('getLatestEntrySiteImages', () => {
    it('returns site images of the latest entry when request is completed', () => {
      const expectedSiteImagesResponse: SiteEntryImage[] = [
        {
          imageId: 1,
          imageUrl: 'http://www.some-address.com',
          uploadedAt: '09/06/2023',
          uploaderUsername: 'First Last',
          uploaderId: 1,
        },
        {
          imageId: 2,
          imageUrl: 'http://www.some-other-address.com',
          uploadedAt: '01/01/2023',
          uploaderUsername: 'Hello World',
          uploaderId: 2,
        },
      ];

      const siteImagesRequest: AsyncRequest<SiteProps, any> =
        AsyncRequestCompleted<SiteProps, any>(dummySite);

      expect(getLatestEntrySiteImages(siteImagesRequest)).toStrictEqual(
        expectedSiteImagesResponse,
      );
    });

    it('returns empty arrays when site props have not been loaded', () => {
      const siteImagesRequest: AsyncRequest<SiteProps, any> =
        AsyncRequestNotStarted();

      expect(getLatestEntrySiteImages(siteImagesRequest)).toStrictEqual([]);
    });
  });

  describe('isTreeAdoptedByUser', () => {
    const dummyAdoptedSites: AdoptedSites = {
      adoptedSites: [0, 1, 3],
    };

    it('returns true when the user has adopted the given site and request is completed', () => {
      const isAdoptedRequest: AsyncRequest<AdoptedSites, any> =
        AsyncRequestCompleted<AdoptedSites, any>(dummyAdoptedSites);

      expect(isTreeAdoptedByUser(isAdoptedRequest, 3)).toBe(true);
    });

    it('returns false when the user has not adopted tree', () => {
      const isAdoptedRequest: AsyncRequest<AdoptedSites, any> =
        AsyncRequestCompleted<AdoptedSites, any>(dummyAdoptedSites);

      expect(isTreeAdoptedByUser(isAdoptedRequest, 2)).toBe(false);
    });

    it('returns false when use has no adopted sites', () => {
      const emptyAdoptedSites: AdoptedSites = {
        adoptedSites: [],
      };

      const isAdoptedRequest: AsyncRequest<AdoptedSites, any> =
        AsyncRequestCompleted<AdoptedSites, any>(emptyAdoptedSites);

      expect(isTreeAdoptedByUser(isAdoptedRequest, 0)).toBe(false);
    });

    it('returns false when request is not completed', () => {
      const isAdoptedRequest: AsyncRequest<AdoptedSites, any> =
        AsyncRequestNotStarted<AdoptedSites, any>();

      expect(isTreeAdoptedByUser(isAdoptedRequest, 0)).toBe(false);
    });
  });

  describe('mapStewardshipToMonthYearOptions', () => {
    it('returns empty arrays when there are no stewardship activities', () => {
      const emptyActivities: StewardshipActivities = {
        stewardshipActivities: [],
      };

      const expectedMonthYearOptions: MonthYearOption[] = [
        {
          month: new Date().toLocaleString('default', { month: 'short' }),
          year: new Date().getFullYear(),
        },
      ];

      const request: AsyncRequest<StewardshipActivities, any> =
        AsyncRequestCompleted<StewardshipActivities, any>(emptyActivities);

      expect(mapStewardshipToMonthYearOptions(request)).toStrictEqual(
        expectedMonthYearOptions,
      );
    });

    it('returns arrays', () => {
      const dummyActivities: StewardshipActivities = {
        stewardshipActivities: [
          {
            id: 0,
            userId: 1,
            date: '01/21/2019',
            watered: true,
            mulched: true,
            cleaned: false,
            weeded: true,
            installedWateringBag: false,
          },
          {
            id: 1,
            userId: 3,
            date: '10/10/2019',
            watered: true,
            mulched: false,
            cleaned: false,
            weeded: false,
            installedWateringBag: false,
          },
          {
            id: 2,
            userId: 2,
            date: '01/13/2020',
            watered: true,
            mulched: true,
            cleaned: false,
            weeded: true,
            installedWateringBag: false,
          },
        ],
      };

      const expectedMonthYearOptions: MonthYearOption[] = [
        {
          month: new Date().toLocaleString('default', { month: 'short' }),
          year: new Date().getFullYear(),
        },
        {
          month: 'Jan',
          year: 2020,
        },
        {
          month: 'Oct',
          year: 2019,
        },
        {
          month: 'Jan',
          year: 2019,
        },
      ];

      const request: AsyncRequest<StewardshipActivities, any> =
        AsyncRequestCompleted<StewardshipActivities, any>(dummyActivities);

      expect(mapStewardshipToMonthYearOptions(request)).toStrictEqual(
        expectedMonthYearOptions,
      );
    });

    it('returns arrays without duplicate entries', () => {
      const dummyActivities: StewardshipActivities = {
        stewardshipActivities: [
          {
            id: 0,
            userId: 1,
            date: '01/13/2021',
            watered: true,
            mulched: true,
            cleaned: false,
            weeded: true,
            installedWateringBag: false,
          },
          {
            id: 1,
            userId: 3,
            date: '02/05/2018',
            watered: true,
            mulched: false,
            cleaned: false,
            weeded: false,
            installedWateringBag: false,
          },
          {
            id: 2,
            userId: 2,
            date: '01/13/2021',
            watered: true,
            mulched: true,
            cleaned: false,
            weeded: true,
            installedWateringBag: false,
          },
          {
            id: 3,
            userId: 1,
            date: '02/01/2018',
            watered: false,
            mulched: true,
            cleaned: false,
            weeded: false,
            installedWateringBag: false,
          },
        ],
      };

      const expectedMonthYearOptions: MonthYearOption[] = [
        {
          month: new Date().toLocaleString('default', { month: 'short' }),
          year: new Date().getFullYear(),
        },
        {
          month: 'Jan',
          year: 2021,
        },
        {
          month: 'Feb',
          year: 2018,
        },
      ];

      const request: AsyncRequest<StewardshipActivities, any> =
        AsyncRequestCompleted<StewardshipActivities, any>(dummyActivities);

      expect(mapStewardshipToMonthYearOptions(request)).toStrictEqual(
        expectedMonthYearOptions,
      );
    });
  });
});
