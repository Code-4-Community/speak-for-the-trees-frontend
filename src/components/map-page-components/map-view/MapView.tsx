import React from 'react';
// import { } from 'googlemaps'
import { Loader } from '@googlemaps/js-api-loader';
import styled from 'styled-components';

let map: google.maps.Map;

const loader = new Loader({
  apiKey: 'AIzaSyBNSl4FTHGzPGsYMmZnDqMkCtAVbMIg6bg',
  version: 'weekly',
});

loader.load().then(() => {
  map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
});

const MapDiv = styled.div`
  height: 100%;
`;

const MapView: React.FC = () => {
  // useEffect(() => {
  //   if (!document.getElementById("googleMapScript")) {
  //     const googleMapScript = document.createElement('script')
  //     googleMapScript.id = "googleMapScript"
  //     googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API}&libraries=places`
  //     window.document.body.appendChild(googleMapScript)
  //   }
  // },[])
  // useEffect(initMap);
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
