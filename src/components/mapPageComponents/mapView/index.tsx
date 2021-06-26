import React, { createRef, useEffect, useState } from 'react';
import useWindowDimensions from '../../windowDimensions';
import { Input, message } from 'antd';
import styled from 'styled-components';
import {
  BlockGeoData,
  MapViews,
  NeighborhoodGeoData,
  SiteGeoData,
} from '../ducks/types';
import TreePopup, {
  BasicTreeInfo,
  NO_SITE_SELECTED,
  NO_TREE_PRESENT,
} from '../../treePopup';
import { shortHand } from '../../../utils/stringFormat';
import { SHORT_HAND_NAMES } from '../../../assets/content';
import { isMobile } from '../../../utils/isCheck';
import { WHITE } from '../../../utils/colors';
import { goToPlace, zoomToLocation } from '../logic/view';
import { predictPlace } from '../logic/predict';
import { BOSTON, BOSTON_BOUNDS, LOADER, STREET_ZOOM } from '../constants';
import {
  setBlocksStyle,
  setNeighborhoodsStyle,
  setPrivateStreetsStyle,
  setSitesStyle,
} from '../logic/style';

const StyledSearch = styled(Input.Search)`
  width: 40vw;
  position: absolute;
  z-index: 2;
`;

const MapDiv = styled.div`
  height: 100%;
`;

let map: google.maps.Map;

interface MapViewProps {
  blocks: BlockGeoData;
  neighborhoods: NeighborhoodGeoData;
  sites: SiteGeoData;
  view: MapViews;
}

const MapView: React.FC<MapViewProps> = ({
  blocks,
  neighborhoods,
  sites,
  view,
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

  const { windowType } = useWindowDimensions();
  const mapRef = createRef<HTMLDivElement>();
  const treePopupRef = createRef<HTMLDivElement>();

  const [mapElement, setMapElement] = useState(mapRef.current);
  const [treePopupElement, setTreePopupElement] = useState(
    treePopupRef.current,
  );

  useEffect(() => {
    setMapElement(mapRef.current);
  }, [mapRef]);

  useEffect(() => {
    setTreePopupElement(treePopupRef.current);
  }, [treePopupRef]);

  useEffect(() => {
    if (mapElement && treePopupElement) {
      const markersArray: google.maps.Marker[] = [];

      LOADER.load().then(() => {
        map = new google.maps.Map(mapElement, {
          center: BOSTON,
          zoom: 12,
          fullscreenControl: false,
          mapTypeControl: false,
          // mapId: mapId,
          restriction: {
            latLngBounds: BOSTON_BOUNDS,
            strictBounds: false,
          },
        });

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

        // Sets up the autocomplete search bar, only shows places in Boston for suggestions)
        const input = document.getElementById('pac-input') as HTMLInputElement;
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

        // Listener for when the user enters a new location
        autocomplete.addListener('place_changed', () => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          // If the place does not have a geometry (if the user did not enter a valid location)
          if (!place.geometry) {
            // Predicts the place the user wanted and sets the search marker at that place
            predictPlace(place, autoService, placesService, goToPredictedPlace);
            return;
          }

          // Otherwise just goes to the place they searched for
          goToPlace(place, searchMarker, map, STREET_ZOOM);
        });

        // Creates a new layer
        const privateStreetsLayer = new google.maps.Data({ map });

        // Loads the objects into the layer
        privateStreetsLayer.loadGeoJson(
          'https://raw.githubusercontent.com/florisdobber/SFTT-map-test/master/private_streets.json',
        );

        // Initially false while the neighborhoods are shown
        setPrivateStreetsStyle(privateStreetsLayer, false);

        // Creates a new layer
        const blocksLayer = new google.maps.Data({ map });

        // Loads the objects into the layer
        blocksLayer.addGeoJson(blocks);

        // Sets the style of the layer to colored blocks with black outline, initially hidden while neighborhoods are shown
        setBlocksStyle(blocksLayer, false);

        // Creates a new layer
        const neighborhoodsLayer = new google.maps.Data({ map });

        // Loads the objects into the layer
        neighborhoodsLayer.addGeoJson(neighborhoods);
        neighborhoodsLayer.forEach((feature) => {
          // For each feature in neighbourhoodsLayer, add a marker
          // We need to do it here as the GeoJson needs to load first
          // If you want, check here for some constraints.
          const marker = new google.maps.Marker({
            map,
            draggable: false,
            label: {
              color: `${WHITE}`,
              fontWeight: 'bold',
              text: shortHand(feature.getProperty('name'), SHORT_HAND_NAMES),
            },
            // Removed the icon here, only text on map.
            icon: {
              labelOrigin: new google.maps.Point(11, 50),
              url: '',
              size: new google.maps.Size(22, 40),
            },
            position: {
              lat: feature.getProperty('lat'),
              lng: feature.getProperty('lng'),
            },
          });
          markersArray.push(marker);
          marker.setMap(map);
        });

        function toggleMarkers(v: boolean) {
          for (const marker of markersArray) {
            marker.setVisible(v);
          }
        }

        // Sets the style of the layer to green shades based on property values with white outline,
        // initially the neighborhoods are shown by themselves
        setNeighborhoodsStyle(neighborhoodsLayer, true);
        // adds listener so reservation modal appears when block clicked
        /*
        blocksLayer.addListener('click', (event) => {
          // get status of block based on color
          const status: ReservationModalType = ((): ReservationModalType => {
            switch (event.feature.getProperty('block_id') % 10) {
              case 1:
                return ReservationModalType.TAKEN;
              case 0:
                return ReservationModalType.RESERVED;
              default:
                return ReservationModalType.OPEN;
            }
          })();
          // show modal
          setShowModal(true);
          // set status of block
          setReservationType(status);
          // set id of block
          setActiveBlockId(event.feature.getProperty('block_id'));
        });
        */

        // Check for clicks on neighborhoods and zoom to when clicked on a neighborhood
        neighborhoodsLayer.addListener('click', (event) => {
          zoomToLocation(
            new google.maps.LatLng(
              event.feature.getProperty('lat'),
              event.feature.getProperty('lng'),
            ),
            map,
            view,
          );
        });

        // Creates a new layer
        const sitesLayer = new google.maps.Data({ map });

        // Loads the objects into the layer
        sitesLayer.addGeoJson(sites);

        // Adds listener so reservation modal appears when block clicked
        sitesLayer.addListener('click', (event) => {
          const eventFeature = event.feature;
          let siteId = eventFeature.getProperty('id');

          // Set site ID to tell tree popup this is an open planting site
          if (!eventFeature.getProperty('treePresent')) {
            siteId = NO_TREE_PRESENT;
          }

          // Sets the information to display in the popup
          setActiveTreeInfo({
            id: siteId,
            commonName: eventFeature.getProperty('commonName'),
            address: eventFeature.getProperty('address'),
          });
          // Popup appears at the site
          eventFeature
            .getGeometry()
            .forEachLatLng((latLng: google.maps.LatLng) =>
              popup.popAtPosition(latLng),
            );
        });

        // Initially hidden while the neighborhoods are shown
        setSitesStyle(sitesLayer, 0, false);

        // Asks user if they want to show their current location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const me = new google.maps.LatLng(
                pos.coords.latitude,
                pos.coords.longitude,
              );
              // eslint-disable-next-line
              const userLocation = new google.maps.Marker({
                position: me,
                map,
                clickable: false,
                icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 5,
                  fillColor: 'blue',
                  fillOpacity: 1,
                  strokeWeight: 0,
                },
              });
            },
            () => {
              message
                .info(
                  'Enable access to your location to display where you are on the map.',
                  5,
                )
                .then();
            },
          );
        }

        // Shows or hides layers based on the zoom level
        function handleZoomChange() {
          google.maps.event.addListener(map, 'zoom_changed', () => {
            const zoomLevel = map.getZoom();
            let zoomedIn = false;

            if (zoomLevel >= view) {
              zoomedIn = true;
            }
            setNeighborhoodsStyle(neighborhoodsLayer, !zoomedIn);
            toggleMarkers(!zoomedIn);
            setPrivateStreetsStyle(privateStreetsLayer, zoomedIn);

            let imageSize = 0;
            switch (view) {
              case MapViews.BLOCKS:
                setBlocksStyle(blocksLayer, zoomedIn);
                break;
              case MapViews.TREES:
                if (zoomLevel >= STREET_ZOOM) {
                  imageSize = 2;
                } else if (zoomLevel > view + 1) {
                  imageSize = 1;
                }
                setSitesStyle(sitesLayer, imageSize, zoomedIn);
                break;
            }
          });
        }

        handleZoomChange();
      });
    }
  }, [blocks, mapElement, treePopupElement, neighborhoods, sites, view]);

  return (
    <>
      <div id="pac-container">
        {!isMobile(windowType) && (
          <StyledSearch
            id={'pac-input'}
            placeholder="Address"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
        )}
      </div>
      <MapDiv id="map" ref={mapRef} />
      <TreePopup treeInfo={activeTreeInfo} popRef={treePopupRef} />
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
