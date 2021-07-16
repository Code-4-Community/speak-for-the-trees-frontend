import React, { useEffect } from 'react';
import MapPage from '../../components/mapPageComponents/mapPage/index';
import TreeSidebar from '../../components/treeSidebar/index';
import { Spin } from 'antd';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/windowDimensions';
import { C4CState } from '../../store';
import MobileMapPage from '../../components/mapPageComponents/mobileMapPage';
import { useDispatch, useSelector, connect } from 'react-redux';
import { getMapGeoData } from '../../components/mapPageComponents/ducks/thunks';
import { getAdoptedSites } from '../treePage/ducks/thunks';
import { MY_TREES_BODY, MY_TREES_TITLE } from '../../assets/content';
import SlideDown from '../../components/slideDown';
import {
  asyncRequestIsComplete,
  asyncRequestIsLoading,
} from '../../utils/asyncRequest';
import {
  MapViews,
  SiteFeaturePropertiesResponse,
  MapGeoDataReducerState,
} from '../../components/mapPageComponents/ducks/types';
import { getMySites } from './ducks/selectors';

interface MyTreesStateProps {
  readonly blocks: MapGeoDataReducerState['blockGeoData'];
  readonly neighborhoods: MapGeoDataReducerState['neighborhoodGeoData'];
  readonly sites: MapGeoDataReducerState['siteGeoData'];
}

const EmptyTreesContainer = styled.div`
  text-align: center;
  padding: 10vh 5vw;
`;

const MyTrees: React.FC<MyTreesStateProps> = ({
  blocks,
  neighborhoods,
  sites,
}) => {
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

  return (
    <>
      <Helmet>
        <title>My Trees</title>
        <meta
          name="description"
          content="A user may view the trees they have adopted"
        />
      </Helmet>

      {(() => {
        switch (windowType) {
          case WindowTypes.Mobile:
            return (
              <MobileMapPage
                view={treeMapView}
                blocks={blocks}
                neighborhoods={neighborhoods}
                sites={sites}
              >
                <SlideDown>
                  <TreeSidebar mySites={mySites} />
                </SlideDown>
              </MobileMapPage>
            );
          case WindowTypes.Tablet:
          case WindowTypes.NarrowDesktop:
          case WindowTypes.Desktop:
            return (
              <MapPage
                sidebarHeader={MY_TREES_TITLE}
                sidebarDescription={MY_TREES_BODY}
                view={treeMapView}
                blocks={blocks}
                neighborhoods={neighborhoods}
                sites={sites}
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
    </>
  );
};

const mapStateToProps = (state: C4CState): MyTreesStateProps => {
  return {
    neighborhoods: state.mapGeoDataState.neighborhoodGeoData,
    blocks: state.mapGeoDataState.blockGeoData,
    sites: state.mapGeoDataState.siteGeoData,
  };
};

export default connect(mapStateToProps)(MyTrees);
