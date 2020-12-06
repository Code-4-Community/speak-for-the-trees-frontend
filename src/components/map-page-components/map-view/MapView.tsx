/// <reference types="@types/googlemaps" />

import React, { useEffect } from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
// import { } from 'googlemaps';
// import { SearchBox } from 'googlemaps'; https://developers.google.com/maps/documentation/javascript/places-autocomplete

const { Search } = Input

const StyledSearch = styled(Search)`
  width: 40vw;
`

let map: google.maps.Map;

function initMap(): void {
  const BOSTON: google.maps.LatLngLiteral = { lat: 42.315, lng: -71.0589 };
  const BOSTON_BOUNDS = {
    north: 42.42,
    south: 42.2,
    west: -71.28,
    east: -70.83,
  };

  const input = document.getElementById("pac-input");
  // const autocomplete = new google.maps.places.Autocomplete(input);
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    // mapId: "76c08a2450c223d9",
    zoom: 12,
    center: BOSTON,
    // restriction: {
    //   latLngBounds: BOSTON_BOUNDS,
    //   strictBounds: false,
    // },
  });

  var private_streets_layer = new google.maps.Data({ map: map });
  var blocks_layer = new google.maps.Data({ map: map });
  var neighborhoods_layer = new google.maps.Data({ map: map });

  private_streets_layer.loadGeoJson(
    'https://raw.githubusercontent.com/florisdobber/SFTT-map-test/master/private_streets.json',
  )
  blocks_layer.loadGeoJson(
    'https://raw.githubusercontent.com/florisdobber/SFTT-map-test/master/blocks.json'
  )
  neighborhoods_layer.loadGeoJson(
    'https://raw.githubusercontent.com/florisdobber/SFTT-map-test/master/neighborhoods_edited.geojson'
  )

}


const MapView: React.FC = () => {
  useEffect(() => {
    if (!document.getElementById("googleMapScript")) {
      const googleMapScript = document.createElement('script')
      googleMapScript.id = "googleMapScript"
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API}&libraries=places`      
      window.document.body.appendChild(googleMapScript)
    }
  },[])
  useEffect(initMap);
  return (
    <>
      <div id="pac-container">
        <StyledSearch id="pac-input" placeholder="Address" />
      </div>
      <div id="map">Test</div>
    </>
  );
};

export default MapView;
