import React, { createRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Input, message } from 'antd';
import styled from 'styled-components';
import {
  BlockGeoData,
  MapViews,
  NeighborhoodGeoData,
  SiteGeoData,
} from '../ducks/types';
import TreePopup, { BasicTreeInfo, NO_SITE_SELECTED } from '../../treePopup';
import { goToPlace } from '../logic/view';
import {
  ALL_SITES_VISIBLE,
  BOSTON,
  BOSTON_BOUNDS,
  LOADER,
  STREET_ZOOM,
} from '../constants';
import {
  addHandleSearch,
  addHandleZoomChange,
  getImageSize,
} from '../logic/event';
import {
  initBlocks,
  initNeighborhoods,
  initPrivateStreets,
  initSites,
  initUserLocation,
} from '../logic/init';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { setSitesStyle } from '../logic/style';
import SiteLegend from '../siteLegend';
import { MapStateProps, Routes } from '../../../App';

const StyledSearch = styled(Input.Search)`
  width: 40vw;
  position: absolute;
  z-index: 2;
`;

const MapDiv = styled.div`
  height: 100%;
`;

let map: google.maps.Map;
let privateStreetsLayer: google.maps.Data;
let neighborhoodsLayer: google.maps.Data;
let blocksLayer: google.maps.Data;
let sitesLayer: google.maps.Data;
let zoomListener: google.maps.MapsEventListener;
const markersArray: google.maps.Marker[] = [];

interface MapViewProps {
  readonly blocks: BlockGeoData;
  readonly neighborhoods: NeighborhoodGeoData;
  readonly sites: SiteGeoData;
  readonly view: MapViews;
  readonly mobile: boolean;
  readonly returnTo?: Routes;
}

const MapView: React.FC<MapViewProps> = ({
  blocks,
  neighborhoods,
  sites,
  view,
  mobile,
  returnTo,
}) => {
  /*
          // visibility of reservation modal
          const [showModal, setShowModal] = useState<boolean>(false);
          // block status for modal
          const [reservationType, setReservationType] = useState<ReservationModalType>(
            ReservationModalType.OPEN,
          );
          // block id for modal
          const [activeBlockId, setActiveBlockId] = useState<number>(-1);
           */
  const location = useLocation<MapStateProps>();

  // BasicTreeInfo to display in tree popup
  const [activeTreeInfo, setActiveTreeInfo] = useState<BasicTreeInfo>({
    id: NO_SITE_SELECTED,
    commonName: '',
    address: '',
  });

  // logic for reservation modal to complete action selected by user
  /*
          const handleOk = async (team?: number) => {
            setShowModal(false);
            switch (reservationType) {
              case ReservationModalType.OPEN:
                // set block status to reserved
                await protectedApiClient.makeReservation(activeBlockId, team);
                await protectedApiClient.completeReservation(activeBlockId, team);
                break;
              case ReservationModalType.RESERVED:
                // set block status to open
                await protectedApiClient.releaseReservation(activeBlockId);
                break;
              case ReservationModalType.TAKEN:
                // block clicked not owned/open so do nothing
                break;
            }
          };
          */

  const [searchInput, setSearchInput] = useState('');

  const mapRef = createRef<HTMLDivElement>();
  const treePopupRef = createRef<HTMLDivElement>();

  const [mapElement, setMapElement] = useState(mapRef.current);
  const [treePopupElement, setTreePopupElement] = useState(
    treePopupRef.current,
  );
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    setMapElement(mapRef.current);
  }, [mapRef]);

  useEffect(() => {
    setTreePopupElement(treePopupRef.current);
  }, [treePopupRef]);

  useEffect(() => {
    let defaultZoom = 12;
    let defaultCenter = BOSTON;
    if (location.state) {
      defaultZoom = location.state.zoom;
      defaultCenter = { lat: location.state.lat, lng: location.state.lng };
    }

    if (mapElement && treePopupElement) {
      LOADER.load()
        .then(() => {
          map = new google.maps.Map(mapElement, {
            center: defaultCenter,
            zoom: defaultZoom,
            fullscreenControl: false,
            mapTypeControl: false,
            restriction: {
              latLngBounds: BOSTON_BOUNDS,
              strictBounds: false,
            },
          });

          // Declare everything that must be created within the loader
          // A class for the custom popup
          class Popup extends google.maps.OverlayView {
            position: google.maps.LatLng;
            content: HTMLDivElement;

            constructor(content: HTMLDivElement, hostMap: google.maps.Map) {
              super();
              this.content = content;
              this.position = new google.maps.LatLng(0, 0);
              this.setMap(hostMap);
            }

            // Appears at the given position
            popAtPosition(pos: google.maps.LatLng) {
              this.position = pos;
              this.draw();
            }

            // Called when the popup is added to the map.
            onAdd() {
              this.getPanes().floatPane.appendChild(this.content);
            }

            // Called when the popup is removed from the map.
            onRemove() {
              if (this.content && this.content.parentElement) {
                this.content.parentElement.removeChild(this.content);
              }
            }

            // Called each frame when the popup needs to draw itself.
            draw() {
              const divPosition = this.getProjection().fromLatLngToDivPixel(
                this.position,
              );

              this.content.style.left = divPosition.x + 'px';
              this.content.style.top = divPosition.y + 'px';
            }
          }

          // Creates and adds the tree popup to the map
          const popup = new Popup(treePopupElement, map);

          function popPopup(latLng: google.maps.LatLng) {
            popup.popAtPosition(latLng);
          }

          // Sets up the autocomplete search bar, only shows places in Boston for suggestions)
          const input = document.getElementById(
            'pac-input',
          ) as HTMLInputElement;
          const autocomplete = new google.maps.places.Autocomplete(input, {
            bounds: BOSTON_BOUNDS,
            strictBounds: true,
          });
          // Services provided by Google Maps
          const autoService = new google.maps.places.AutocompleteService(); // to retrieve autocomplete predictions
          const placesService = new google.maps.places.PlacesService(map); // to search for and find details about places

          // A marker to show at the location a user searches for
          const searchMarker: google.maps.Marker = new google.maps.Marker({
            map,
          });

          // Callback function sets searchMarker at place and updates the text in the search input
          function goToPredictedPlace(
            place: google.maps.places.PlaceResult,
            status: google.maps.places.PlacesServiceStatus,
          ): void {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              goToPlace(place, searchMarker, map, STREET_ZOOM);
              setSearchInput(place.name);
            }
          }

          // Adds a listener for user location searches
          addHandleSearch(
            autocomplete,
            autoService,
            placesService,
            goToPredictedPlace,
            searchMarker,
            map,
          );

          // Creates data layers and add respective event listeners
          const zoomedIn = defaultZoom >= view;
          privateStreetsLayer = initPrivateStreets(map, zoomedIn);
          blocksLayer = initBlocks(
            blocks,
            map,
            zoomedIn && view === MapViews.BLOCKS,
          );
          neighborhoodsLayer = initNeighborhoods(
            neighborhoods,
            markersArray,
            view,
            map,
            !zoomedIn,
          );
          sitesLayer = initSites(
            sites,
            ALL_SITES_VISIBLE,
            setActiveTreeInfo,
            popPopup,
            map,
            getImageSize(defaultZoom, view),
            zoomedIn && view === MapViews.TREES,
          );

          // Sets marker at the user's current location, if they allow it
          initUserLocation(map);

          zoomListener = addHandleZoomChange(
            neighborhoodsLayer,
            markersArray,
            privateStreetsLayer,
            blocksLayer,
            sitesLayer,
            ALL_SITES_VISIBLE,
            view,
            map,
          );

          setMapLoaded(true);
        })
        .catch((err) => message.error(err.message));
    }
  }, [
    blocks,
    mapElement,
    treePopupElement,
    neighborhoods,
    sites,
    view,
    location.state,
  ]);

  // Add new zoom listener and update sites style whenever visibleSites changes
  const onCheck = (values: CheckboxValueType[]): void => {
    if (mapLoaded && view === MapViews.TREES) {
      google.maps.event.removeListener(zoomListener);
      zoomListener = addHandleZoomChange(
        neighborhoodsLayer,
        markersArray,
        privateStreetsLayer,
        blocksLayer,
        sitesLayer,
        values,
        view,
        map,
      );

      const zoom = map.getZoom();
      if (zoom >= view) {
        setSitesStyle(sitesLayer, values, getImageSize(zoom, view), true);
      }
    }
  };

  return (
    <>
      <div id="pac-container">
        <StyledSearch
          id={'pac-input'}
          placeholder="Address"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />
      </div>
      {view === MapViews.TREES && !mobile && <SiteLegend onCheck={onCheck} />}
      <MapDiv id="map" ref={mapRef} />
      <TreePopup
        treeInfo={activeTreeInfo}
        popRef={treePopupRef}
        returnTo={returnTo}
        mobile={mobile}
      />
      {/*
      <ReservationModal
        status={reservationType}
        blockID={activeBlockId}
        onOk={handleOk}
        onCancel={() => setShowModal(false)}
        isVisible={showModal}
      />
      */}
    </>
  );
};

export default MapView;
