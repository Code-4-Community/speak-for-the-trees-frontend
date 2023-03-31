import React, { createRef, useEffect, useState, useCallback } from 'react';
import { Input, message } from 'antd';
import { MapViews, ReturnMapData } from '../../ducks/types';
import { BOSTON_BOUNDS, LOADER, STREET_ZOOM } from '../../constants';
import { addHandleSearch } from '../../logic/event';
import TreePopup, { BasicTreeInfo } from '../../../treePopup';
import styled from 'styled-components';
import { goToPlace } from '../../logic/view';
import { InitMapData } from '../../ducks/types';
import { BREAKPOINT_TABLET } from '../../../windowDimensions';

const StyledSearch = styled(Input.Search)`
  width: 20vw;
  position: absolute;
  z-index: 2;

  @media (max-width: ${BREAKPOINT_TABLET}px) {
    width: 100vw;
  }
`;

const MapDiv = styled.div`
  height: 100%;
`;

interface MapWithPopupProps {
  readonly view: MapViews;
  readonly zoom: number;
  readonly lat: number;
  readonly lng: number;
  readonly initMap: (mapData: InitMapData) => ReturnMapData;
  readonly defaultActiveTree: BasicTreeInfo;
}

let map: google.maps.Map;
const markersArray: google.maps.Marker[] = [];

const MapWithPopup: React.FC<MapWithPopupProps> = ({
  view,
  zoom,
  lat,
  lng,
  initMap,
  defaultActiveTree,
  children,
}) => {
  // BasicTreeInfo to display in tree popup
  const [activeTreeInfo, setActiveTreeInfo] =
    useState<BasicTreeInfo>(defaultActiveTree);

  const initMapCallback = useCallback(initMap, []);

  const mapRef = createRef<HTMLDivElement>();
  const treePopupRef = createRef<HTMLDivElement>();

  const [mapElement, setMapElement] = useState(mapRef.current);
  const [treePopupElement, setTreePopupElement] = useState(
    treePopupRef.current,
  );

  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    setMapElement(mapRef.current);
  }, [mapRef]);

  useEffect(() => {
    setTreePopupElement(treePopupRef.current);
  }, [treePopupRef]);

  useEffect(() => {
    if (mapElement && treePopupElement) {
      LOADER.load()
        .then(() => {
          map = new google.maps.Map(mapElement, {
            center: { lat, lng },
            zoom,
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

          const thisMapData: InitMapData = {
            map,
            zoom,
            markersArray,
            popPopup,
            setActiveTreeInfo,
          };

          const setMapData = initMapCallback(thisMapData);

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

          // Callback function sets searchMarker at place and updates the text in the search input
          function goToPredictedPlace(
            place: google.maps.places.PlaceResult,
            status: google.maps.places.PlacesServiceStatus,
          ): void {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              goToPlace(place, setMapData.searchMarker, map, STREET_ZOOM);
              setSearchInput(place.name);
            }
          }

          // Adds a listener for user location searches
          addHandleSearch(
            autocomplete,
            autoService,
            placesService,
            goToPredictedPlace,
            setMapData.searchMarker,
            map,
          );
        })
        .catch((err) => message.error(err.message));
    }
  }, [mapElement, treePopupElement, view, zoom, lat, lng, initMapCallback]);

  return (
    <>
      <div id="pac-container">
        <StyledSearch
          id={'pac-input'}
          placeholder="Search by address"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />
      </div>
      <MapDiv id="map" ref={mapRef} />
      <TreePopup treeInfo={activeTreeInfo} popRef={treePopupRef} />
      {children}
    </>
  );
};

export default MapWithPopup;
