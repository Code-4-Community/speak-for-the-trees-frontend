import React from 'react';
import { Input } from 'antd';
import { Loader } from '@googlemaps/js-api-loader';
import styled from 'styled-components';

const { Search } = Input;

const StyledSearch = styled(Search)`
  width: 40vw;
`;

let map: google.maps.Map;

const BOSTON: google.maps.LatLngLiteral = { lat: 42.315, lng: -71.0589 };
const BOSTON_BOUNDS = {
  north: 42.42,
  south: 42.2,
  west: -71.28,
  east: -70.83,
};

const loader = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY!,
  libraries: ['places'],
  mapIds: ['76c08a2450c223d9'],
});

loader.load().then(() => {
  map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
    center: BOSTON,
    zoom: 12,
    fullscreenControl: false,
    mapTypeControl: false,
    // mapId: 76c08a2450c223d9,
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
      map.setZoom(16);
    }
  });

  const privateStreetsLayer = new google.maps.Data({ map });

  privateStreetsLayer.loadGeoJson(
    'https://raw.githubusercontent.com/florisdobber/SFTT-map-test/master/private_streets.json',
  );

  function setPrivateStreetsStyle(v: boolean) {
    privateStreetsLayer.setStyle({
      strokeColor: 'red',
      strokeWeight: 2,
      visible: v,
    });
  }
  
  setPrivateStreetsStyle(false);

  const blocksLayer = new google.maps.Data({ map });
  blocksLayer.loadGeoJson(
    'https://raw.githubusercontent.com/florisdobber/SFTT-map-test/master/blocks.json',
  );


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

  setBlocksStyle(false);

  const neighborhoodsLayer = new google.maps.Data({ map });
  neighborhoodsLayer.loadGeoJson(
    'https://raw.githubusercontent.com/florisdobber/SFTT-map-test/master/neighborhoods_edited.geojson',
  );


  function setNeighborhoodsStyle(v: boolean) {
    neighborhoodsLayer.setStyle((feature) => {
      return {
        fillColor: 'green',
        fillOpacity: (feature.getProperty('Neighborhood_ID') / 100) * 2 + 0.1, // replace this with completion percentage
        strokeWeight: 1,
        strokeColor: 'white',
        visible: v,
      };
    });
  }

  setNeighborhoodsStyle(true);

  // Check for clicks on neighborhoods and zoom to when clicked on a neighborhood
  neighborhoodsLayer.addListener('click', (event) => {
    map.setZoom(14);
    map.panTo({
      lat: event.feature.getProperty('Latitude'),
      lng: event.feature.getProperty('Longitude'),
    });
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const me = new google.maps.LatLng(
          pos.coords.latitude,
          pos.coords.longitude,
        );
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
      (error) => {
        // Handle the error
        // tslint:disable-next-line
        console.log('Location not found');
      },
    );
  }

  function handleZoomChange() {
    google.maps.event.addListener(map, 'zoom_changed', () => {
      const zoomLevel = map.getZoom();
      let zoomedIn = false;

      if (zoomLevel >= 13) {
        zoomedIn = true
      }

      setNeighborhoodsStyle(!zoomedIn);
      setBlocksStyle(zoomedIn);
      setPrivateStreetsStyle(zoomedIn);
    });
  }

  handleZoomChange();

});

const MapDiv = styled.div`
  height: 100%;
`;

const MapView: React.FC = () => {
  return (
    <>
      {/* <div id="pac-container">
        <StyledSearch id="pac-input" placeholder="Address" />
      </div> */}
      <MapDiv id="map"></MapDiv>
    </>
  );
};

export default MapView;
