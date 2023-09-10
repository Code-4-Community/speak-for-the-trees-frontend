import {
  stewardshipActivities,
  siteData,
  adoptedSites,
} from '../ducks/actions';
import reducers, { initialSiteState } from '../ducks/reducer';
import protectedReducer, {
  initialProtectedSiteState,
} from '../ducks/protectedReducer';
import {
  SiteProps,
  StewardshipActivities,
  SiteReducerState,
  ProtectedSitesReducerState,
  AdoptedSites,
} from '../ducks/types';
import { AsyncRequestCompleted } from '../../../utils/asyncRequest';

describe('Tree Page Reducer', () => {
  describe('Site information', () => {
    it('Updates state correctly when site info and stewardship data is retrieved', () => {
      const siteInfo: SiteProps = {
        neighborhoodId: 0,
        siteId: 1,
        blockId: 1,
        lat: 10,
        lng: 10,
        city: 'Beantown',
        zip: '11111',
        owner: 'ROW',
        entries: [
          {
            id: 0,
            createdAt: 100000,
            updatedAt: 100000,
            images: [],
          },
        ],
      };

      const stewardship: StewardshipActivities = {
        stewardshipActivities: [
          {
            id: 0,
            userId: 1,
            date: 'Jan 1',
            watered: true,
            mulched: false,
            cleaned: false,
            weeded: true,
            installedWateringBag: false,
          },
          {
            id: 1,
            userId: 1,
            date: 'Jan 2',
            watered: false,
            mulched: true,
            cleaned: true,
            weeded: false,
            installedWateringBag: false,
          },
        ],
      };

      const siteAction = siteData.loaded(siteInfo);
      const stewardshipAction = stewardshipActivities.loaded(stewardship);
      const expectedNextState: SiteReducerState = {
        ...initialSiteState,
        siteData: AsyncRequestCompleted<SiteProps, void>(siteInfo),
        stewardshipActivityData: AsyncRequestCompleted<
          StewardshipActivities,
          void
        >(stewardship),
      };
      let realNextState = reducers(initialSiteState, siteAction);
      realNextState = reducers(realNextState, stewardshipAction);
      expect(realNextState).toStrictEqual(expectedNextState);
    });
  });
});

describe('Protected Tree Page Reducer', () => {
  describe('Updating adopted site state', () => {
    it('Updates state correctly when adopted site information is retrieved', () => {
      const sites: AdoptedSites = {
        adoptedSites: [1, 2],
      };
      const action = adoptedSites.loaded(sites);
      const expectedNextState: ProtectedSitesReducerState = {
        ...initialProtectedSiteState,
        adoptedSites: AsyncRequestCompleted<AdoptedSites, void>(sites),
      };

      expect(protectedReducer(initialProtectedSiteState, action)).toEqual(
        expectedNextState,
      );
    });
  });
});
