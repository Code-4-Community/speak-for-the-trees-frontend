import React, { createRef, useEffect, useState } from 'react';
import useWindowDimensions from '../../windowDimensions';
import { Input, message } from 'antd';
import { Loader } from '@googlemaps/js-api-loader';
import styled from 'styled-components';
import {
  BlockGeoData,
  NeighborhoodGeoData,
  SiteGeoData,
  MapViews,
} from '../ducks/types';
import TreePopup, {
  BasicTreeInfo,
  NO_SITE_SELECTED,
  NO_TREE_PRESENT,
} from '../../treePopup';
import { shortHand } from '../../../utils/stringFormat';
import { SHORT_HAND_NAMES } from '../../../assets/content';
import { isMobile } from '../../../utils/isCheck';
import {
  BLACK,
  MAP_GREEN,
  MAP_RED,
  MAP_YELLOW,
  RED,
  WHITE,
} from '../../../utils/colors';
import {
  ADOPTED_ICONS,
  OPEN_ICONS,
  STANDARD_ICONS,
  YOUNG_ICONS,
} from '../../../assets/images/siteIcons';

const StyledSearch = styled(Input.Search)`
  width: 40vw;
  position: absolute;
  z-index: 2;
`;

let map: google.maps.Map;

const zoomedInLevel = 16;
const BOSTON: google.maps.LatLngLiteral = { lat: 42.315, lng: -71.0589 };
const BOSTON_BOUNDS = {
  north: 42.42,
  south: 42.2,
  west: -71.28,
  east: -70.83,
};

const MapDiv = styled.div`
  height: 100%;
`;

// Three years before the current date
const breakpointDate = new Date().setFullYear(new Date().getFullYear() - 3);

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

  const { windowType } = useWindowDimensions();

  const mapRef = createRef<HTMLDivElement>();
  const treePopupRef = createRef<HTMLDivElement>();

  const loader = new Loader({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY || '',
    libraries: ['places'],
    mapIds: ['76c08a2450c223d9'],
  });

  // eslint-disable-next-line
  const mapId = '76c08a2450c223d9';

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

      loader.load().then(() => {
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

          constructor(content: HTMLDivElement) {
            super();
            this.content = content;
            this.position = new google.maps.LatLng(0, 0);
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

        // Create and add the tree popup to the map
        const popup = new Popup(treePopupElement);
        popup.setMap(map);

        const input = document.getElementById('pac-input') as HTMLInputElement;
        const autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();

          if (!place.geometry) {
            window.alert(
              "No details available for input: '" + place.name + "'",
            );
            return;
          }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(zoomedInLevel);
          }
        });

        // Creates a new layer
        const privateStreetsLayer = new google.maps.Data({ map });

        // Loads the objects into the layer
        privateStreetsLayer.loadGeoJson(
          'https://raw.githubusercontent.com/florisdobber/SFTT-map-test/master/private_streets.json',
        );

        // Sets the style of the layer to simple red lines
        function setPrivateStreetsStyle(v: boolean) {
          privateStreetsLayer.setStyle({
            strokeColor: `${RED}`,
            strokeWeight: 2,
            visible: v,
          });
        }

        // Initially false while the neighborhoods are shown
        setPrivateStreetsStyle(false);

        // Creates a new layer
        const blocksLayer = new google.maps.Data({ map });

        // Loads the objects into the layer
        blocksLayer.addGeoJson(blocks);

        // Sets the style of the layer to colored blocks with black outline
        function setBlocksStyle(v: boolean) {
          blocksLayer.setStyle((feature) => {
            let color = `${MAP_GREEN}`;

            // Use this for coloring reserved/completed blocks a different color
            if (feature.getProperty('block_id') % 10 === 0) {
              color = `${MAP_YELLOW}`;
            }

            if (feature.getProperty('block_id') % 10 === 1) {
              color = `${MAP_RED}`;
            }

            // Use this for selecting blocks
            if (feature.getProperty('PRECINCT') === 'YES') {
              color = `${BLACK}`;
            }

            // Set styling here
            return {
              fillColor: color,
              strokeColor: `${BLACK}`,
              strokeWeight: 1,
              visible: v,
            };
          });
        }

        // Initially false while the neighborhoods are shown
        setBlocksStyle(false);

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

        // Sets the style of the layer to green shades based on property values with white outline
        function setNeighborhoodsStyle(v: boolean) {
          neighborhoodsLayer.setStyle((feature) => {
            return {
              fillColor: `${MAP_GREEN}`,
              fillOpacity:
                (feature.getProperty('neighborhood_id') / 100) * 2 + 0.1, // TODO: replace this with completion percentage
              strokeWeight: 1,
              strokeColor: `${WHITE}`,
              visible: v,
            };
          });
        }

        function toggleMarkers(v: boolean) {
          for (const marker of markersArray) {
            marker.setVisible(v);
          }
        }

        // Initially true while the neighborhoods are shown by themselves
        setNeighborhoodsStyle(true);
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
          map.setZoom(view);
          map.panTo({
            lat: event.feature.getProperty('lat'),
            lng: event.feature.getProperty('lng'),
          });
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
          if (!eventFeature.getProperty('tree_present')) {
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

        function setSitesStyle(visible: boolean) {
          sitesLayer.setStyle((feature) => {
            let icon;
            let imageSize = 0;

            const zoomLevel = map.getZoom();
            if (zoomLevel > 17 && zoomLevel < 20) {
              imageSize = 1;
            } else if (zoomLevel >= 20) {
              imageSize = 2;
            }

            // If there is no tree present, use the openSiteIcon
            // If the tree was planted within the past three years, use youngTreeIcon
            // If the tree is adopted, use the adoptedTreeIcon
            const plantedDate = feature.getProperty('plantingDate');
            const adopted = !!feature.getProperty('adopterId');
            if (!feature.getProperty('tree_present')) {
              icon = OPEN_ICONS[imageSize];
            } else if (adopted) {
              icon = ADOPTED_ICONS[imageSize];
            } else if (!!plantedDate && plantedDate > breakpointDate) {
              icon = YOUNG_ICONS[imageSize];
            } else {
              icon = STANDARD_ICONS[imageSize];
            }

            return {
              visible,
              icon,
            };
          });
        }

        // Initially false while the neighborhoods are shown
        setSitesStyle(false);

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
              message.info(
                'Enable access to your location to display where you are on the map.',
                5,
              );
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
            setNeighborhoodsStyle(!zoomedIn);
            toggleMarkers(!zoomedIn);
            setPrivateStreetsStyle(zoomedIn);

            switch (view) {
              case MapViews.BLOCKS:
                setBlocksStyle(zoomedIn);
                break;
              case MapViews.TREES:
                setSitesStyle(zoomedIn);
                break;
            }
          });
        }

        handleZoomChange();
      });
    }
  }, [
    blocks,
    loader,
    mapElement,
    treePopupElement,
    neighborhoods,
    sites,
    view,
  ]);

  return (
    <>
      <div id="pac-container">
        {!isMobile(windowType) && (
          <StyledSearch id="pac-input" placeholder="Address" />
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
