import React, { useEffect, useState } from 'react';
import MapPage from '../../components/mapComponents/mapPageComponents/mapPage/index';
import TreeSidebar from '../../components/treeSidebar/index';
import Spin from 'antd/es/spin';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/windowDimensions';
import { C4CState } from '../../store';
import MobileMapPage from '../../components/mapComponents/mapPageComponents/mobileMapPage';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getMapGeoData } from '../../components/mapComponents/ducks/thunks';
import { getAdoptedSites } from '../treePage/ducks/thunks';
import SlideDown from '../../components/slideDown';
import {
  asyncRequestIsComplete,
  asyncRequestIsLoading,
} from '../../utils/asyncRequest';
import {
  MapGeoDataReducerState,
  MapViews,
  SiteFeaturePropertiesResponse,
} from '../../components/mapComponents/ducks/types';
import { getMySites } from './ducks/selectors';
import { Routes } from '../../App';
import TreeMapDisplay from '../../components/mapComponents/mapDisplays/treeMapDisplay';
import { MOBILE_SLIDE_HEIGHT } from '../../components/mapComponents/constants';
import { MapTypes } from '../../context/types';
import { MapTypeContext } from '../../context/mapTypeContext';
import { useTranslation } from 'react-i18next';
import { n } from '../../utils/stringFormat';
import { site } from '../../constants';

interface MyTreesStateProps {
  readonly neighborhoods: MapGeoDataReducerState['neighborhoodGeoData'];
  readonly sites: MapGeoDataReducerState['siteGeoData'];
}

const EmptyTreesContainer = styled.div`
  text-align: center;
  padding: 10vh 5vw;
`;

const MyTrees: React.FC<MyTreesStateProps> = ({ neighborhoods, sites }) => {
  const { t } = useTranslation(n(site, ['myTrees']), { nsMode: 'fallback' });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMapGeoData());
    dispatch(getAdoptedSites());
  }, [dispatch]);

  const { windowType } = useWindowDimensions();

  const treeMapView = MapViews.TREES;

  const mySites: SiteFeaturePropertiesResponse[] = useSelector(
    (state: C4CState) => {
      return getMySites(
        state.adoptedSitesState.adoptedSites,
        state.mapGeoDataState.siteGeoData,
      );
    },
  );

  const [mapTypeId, setMapTypeId] = useState<MapTypes>(MapTypes.ROADMAP);

  return (
    <>
      <Helmet>
        <title>My Trees</title>
        <meta
          name="description"
          content="A user may view the trees they have adopted"
        />
      </Helmet>

      <MapTypeContext.Provider value={[mapTypeId, setMapTypeId]}>
        {(() => {
          switch (windowType) {
            case WindowTypes.Mobile:
            case WindowTypes.Tablet:
              return (
                <MobileMapPage
                  mapContent={
                    <TreeMapDisplay
                      neighborhoods={neighborhoods}
                      sites={sites}
                      mobile={true}
                    />
                  }
                  returnTo={Routes.MY_TREES}
                >
                  <SlideDown defaultOpen slideHeight={MOBILE_SLIDE_HEIGHT}>
                    <TreeSidebar mySites={mySites} />
                  </SlideDown>
                </MobileMapPage>
              );
            case WindowTypes.NarrowDesktop:
            case WindowTypes.Desktop:
              return (
                <MapPage
                  mapContent={
                    <TreeMapDisplay
                      neighborhoods={neighborhoods}
                      sites={sites}
                      mobile={false}
                    />
                  }
                  view={treeMapView}
                  sidebarHeader={t('title')}
                  sidebarDescription={t('body')}
                  windowType={windowType}
                >
                  {asyncRequestIsComplete(sites) && (
                    <TreeSidebar mySites={mySites} />
                  )}
                  {asyncRequestIsLoading(sites) && (
                    <EmptyTreesContainer>
                      <Spin size="large" />
                    </EmptyTreesContainer>
                  )}
                </MapPage>
              );
          }
        })()}
      </MapTypeContext.Provider>
    </>
  );
};

const mapStateToProps = (state: C4CState): MyTreesStateProps => {
  return {
    neighborhoods: state.mapGeoDataState.neighborhoodGeoData,
    sites: state.mapGeoDataState.siteGeoData,
  };
};

export default connect(mapStateToProps)(MyTrees);
