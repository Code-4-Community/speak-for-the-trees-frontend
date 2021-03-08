import React, { useState } from 'react';
import useWindowDimensions, { WindowTypes } from '../../window-dimensions';
import { Input, message } from 'antd';
import { Loader } from '@googlemaps/js-api-loader';
import styled from 'styled-components';
import ReservationModal, {
  ReservationModalType,
} from '../../../components/ReservationModal';
import protectedApiClient from '../../../api/protectedApiClient';

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

const MapView: React.FC = () => {
  //visibility of reservation modal
  const [showModal, setShowModal] = useState<boolean>(false);
  //block status for modal
  const [reservationType, setReservationType] = useState<ReservationModalType>(
    ReservationModalType.OPEN,
  );
  //block id for modal
  const [activeBlockId, setActiveBlockId] = useState<number>(-1);
  //logic for reservation modal to complete action selected by user
  const handleOk = (): void => {
    setShowModal(false);
    switch (reservationType) {
      case ReservationModalType.OPEN:
        //set block status to reserved
        protectedApiClient.makeReservation(activeBlockId);
        break;
      case ReservationModalType.RESERVED:
        //set block status to open
        break;
      default:
        //block clicked not owned/open
        break;
    }
  };

  const { windowType } = useWindowDimensions();

  const loader = new Loader({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY || '',
    libraries: ['places'],
    mapIds: ['76c08a2450c223d9'],
  });

  // eslint-disable-next-line
  const mapId = '76c08a2450c223d9';
  const markersArray: google.maps.Marker[] = [];

  interface KeyValuePair {
    key: string;
    value: string;
  }
  // This KeyValuePair array that stores names to be shortHand-ed.
  // To add a new area, wrap a key value pair with {}.
  const shortHandNames: KeyValuePair[] = [
    { key: 'North End', value: 'NE' },
    { key: 'West End', value: 'WE' },
    { key: 'Leather District', value: 'LD' },
    { key: 'Beacon Hill', value: 'BH' },
    { key: 'Back Bay', value: 'BB' },
    { key: 'Downtown', value: 'DT' },
    { key: 'Chinatown', value: 'CT' },
    { key: 'Bay Village', value: 'BV' },
  ];

  loader.load().then(() => {
    map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
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

    const input = document.getElementById('pac-input') as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();

      if (!place.geometry) {
        window.alert("No details available for input: '" + place.name + "'");
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
        strokeColor: 'red',
        strokeWeight: 2,
        visible: v,
      });
    }

    // Initially false while the neighborhoods are shown
    setPrivateStreetsStyle(false);

    // Creates a new layer
    const blocksLayer = new google.maps.Data({ map });

    // Loads the objects into the layer
    blocksLayer.loadGeoJson(
      'https://raw.githubusercontent.com/florisdobber/SFTT-map-test/master/blocks.json',
    );

    // Sets the style of the layer to colored blocks with black outline
    function setBlocksStyle(v: boolean) {
      blocksLayer.setStyle((feature) => {
        let color = 'green';

        // Use this for coloring reserved/completed blocks a different color
        if (feature.getProperty('ID') % 10 === 0) {
          color = 'yellow';
        }

        if (feature.getProperty('ID') % 10 === 1) {
          color = 'red';
        }

        // Use this for selecting blocks
        if (feature.getProperty('PRECINCT') === 'YES') {
          color = 'black';
        }

        // Set styling here
        return {
          fillColor: color,
          strokeColor: 'black',
          strokeWeight: 1,
          visible: v,
        };
      });
    }

    // Initially false while the neighborhoods are shown
    setBlocksStyle(false);

    //adds listener so reservation modal appears when block clicked
    blocksLayer.addListener('click', (event) => {
      //get status of block based on color
      const status: ReservationModalType = ((): ReservationModalType => {
        switch (event.feature.getProperty('ID') % 10) {
          case 1:
            return ReservationModalType.TAKEN;
          case 0:
            return ReservationModalType.RESERVED;
          default:
            return ReservationModalType.OPEN;
        }
      })();
      //show modal
      setShowModal(true);
      //set status of block
      setReservationType(status);
      //set id of block
      setActiveBlockId(event.feature.getProperty('ID'));
    });

    // Creates a new layer
    const neighborhoodsLayer = new google.maps.Data({ map });

    // Function: Returns name in shortHand
    function shortHand(name: string): string {
      for (const shName of shortHandNames) {
        if (shName.key === name) {
          return shName.value;
        }
      }
      return name;
    }
    // Loads the objects into the layer
    neighborhoodsLayer.loadGeoJson(
      'https://raw.githubusercontent.com/florisdobber/SFTT-map-test/master/neighborhoods_edited.geojson',
      {},
      () => {
        // For each feature in neighbourhoodsLayer, add a marker
        // We need to do it here as the GeoJson needs to load first
        neighborhoodsLayer.forEach((feature) => {
          // If you want, check here for some constraints.
          const marker = new google.maps.Marker({
            map,
            draggable: false,
            label: {
              color: 'white',
              fontWeight: 'bold',
              text: shortHand(feature.getProperty('Name')),
            },
            // Removed the icon here, only text on map.
            icon: {
              labelOrigin: new google.maps.Point(11, 50),
              url: '',
              size: new google.maps.Size(22, 40),
            },
            position: {
              lat: feature.getProperty('Latitude'),
              lng: feature.getProperty('Longitude'),
            },
          });
          markersArray.push(marker);
          marker.setMap(map);
        });
      },
    );

    // Sets the style of the layer to green shades based on property values with white outline
    function setNeighborhoodsStyle(v: boolean) {
      neighborhoodsLayer.setStyle((feature) => {
        return {
          fillColor: 'green',
          fillOpacity: (feature.getProperty('Neighborhood_ID') / 100) * 2 + 0.1, // TODO: replace this with completion percentage
          strokeWeight: 1,
          strokeColor: 'white',
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

    // Check for clicks on neighborhoods and zoom to when clicked on a neighborhood
    neighborhoodsLayer.addListener('click', (event) => {
      map.setZoom(14);
      map.panTo({
        lat: event.feature.getProperty('Latitude'),
        lng: event.feature.getProperty('Longitude'),
      });
    });

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

        if (zoomLevel >= 13) {
          zoomedIn = true;
        }
        setNeighborhoodsStyle(!zoomedIn);
        toggleMarkers(!zoomedIn);
        setBlocksStyle(zoomedIn);
        setPrivateStreetsStyle(zoomedIn);
      });
    }

    handleZoomChange();
  });

  return (
    <>
      <div id="pac-container">
        {windowType !== WindowTypes.Mobile && (
          <StyledSearch id="pac-input" placeholder="Address" />
        )}
      </div>
      <MapDiv id="map"></MapDiv>
      <ReservationModal
        status={reservationType}
        blockID={activeBlockId}
        onOk={handleOk}
        onCancel={() => setShowModal(false)}
        isVisible={showModal}
      />
    </>
  );
};

export default MapView;
