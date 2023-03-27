import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import MapPage from '../../components/mapComponents/mapPageComponents/mapPage';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/windowDimensions';
import { getMapGeoData } from '../../components/mapComponents/ducks/thunks';
import { C4CState } from '../../store';
import { isLoggedIn } from '../../auth/ducks/selectors';
import styled from 'styled-components';
import MobileMapPage from '../../components/mapComponents/mapPageComponents/mobileMapPage';
import MobileLandingBar from '../../components/mapComponents/mapPageComponents/mobileLandingBar';
import {
  MapGeoDataReducerState,
  MapViews,
} from '../../components/mapComponents/ducks/types';
import MapLegend from '../../components/mapComponents/mapLegend';
import { Languages, Routes } from '../../App';
import TreeMapDisplay from '../../components/mapComponents/mapDisplays/treeMapDisplay';
import SlideDown from '../../components/slideDown';
import { MOBILE_SLIDE_HEIGHT } from '../../components/mapComponents/constants';
import { Modal, Typography } from 'antd';
import { DARK_GREEN } from '../../utils/colors';
import {
  LANDING_TITLE,
  MODAL_OK_TEXT,
  MODAL_PARAGRAPH,
  MODAL_TITLE,
} from './content';
import { SFTT_PARTNER_LOGOS } from '../../assets/links';
import LandingContent from '../../components/landingContent';
import { MapTypes } from '../../context/types';
import { MapTypeContext } from '../../context/mapTypeContext';

const ModalTitle = styled(Typography.Text)`
  font-size: 20px;
  color: ${DARK_GREEN};
`;

const ModalParagraph = styled(Typography.Paragraph)`
  font-size: 16px;
  line-height: 24px;
`;

const ModalImage = styled.img`
  width: 100%;
  margin-top: 30px;
`;

const PaddedContent = styled.div`
  padding: 15px 0px;
  width: 90%;
  margin: auto;
`;

interface LandingProps {
  readonly neighborhoods: MapGeoDataReducerState['neighborhoodGeoData'];
  readonly sites: MapGeoDataReducerState['siteGeoData'];
}

const Landing: React.FC<LandingProps> = ({ neighborhoods, sites }) => {
  const dispatch = useDispatch();
  const loggedIn: boolean = useSelector((state: C4CState) =>
    isLoggedIn(state.authenticationState.tokens),
  );

  // todo: replace this with prop when implementing languages
  const lang = Languages.ENGLISH;

  useEffect(() => {
    dispatch(getMapGeoData());
  }, [dispatch]);

  // separate useEffect to minimize dependencies/dispatches that will reload map
  useEffect(() => {
    // show users who aren't logged in a welcome modal
    if (!loggedIn) {
      Modal.info({
        title: <ModalTitle strong>{MODAL_TITLE[lang]}</ModalTitle>,
        content: (
          <ModalParagraph>
            {MODAL_PARAGRAPH[lang]}
            <ModalImage src={SFTT_PARTNER_LOGOS} alt={'SFTT Logo'} />
          </ModalParagraph>
        ),
        okText: MODAL_OK_TEXT[lang],
        centered: true,
        width: '75%',
        icon: null,
        maskClosable: true,
        autoFocusButton: null,
      });
    }
  }, [loggedIn, lang]);

  const { windowType } = useWindowDimensions();

  const landingMapView = MapViews.TREES;

  const [mapTypeId, setMapTypeId] = useState<MapTypes>(MapTypes.ROADMAP);

  return (
    <>
      <Helmet>
        <title>Speak for the Trees</title>
        <meta
          name="description"
          content="The first page someone sees if they are not logged in, contains a read only map of Boston neighborhoods and some information about the tree counts of Speak for the Trees"
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
                  returnTo={Routes.LANDING}
                >
                  <SlideDown slideHeight={MOBILE_SLIDE_HEIGHT}>
                    <PaddedContent>
                      <MobileLandingBar
                        barHeader={LANDING_TITLE[lang]}
                        barDescription={<LandingContent />}
                        isLoggedIn={loggedIn}
                      >
                        <MapLegend view={landingMapView} canHide={false} />
                      </MobileLandingBar>
                    </PaddedContent>
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
                  sidebarHeader={LANDING_TITLE[lang]}
                  sidebarDescription={<LandingContent />}
                  view={landingMapView}
                  windowType={windowType}
                />
              );
          }
        })()}
      </MapTypeContext.Provider>
    </>
  );
};

const mapStateToProps = (state: C4CState): LandingProps => {
  return {
    neighborhoods: state.mapGeoDataState.neighborhoodGeoData,
    sites: state.mapGeoDataState.siteGeoData,
  };
};

export default connect(mapStateToProps)(Landing);
