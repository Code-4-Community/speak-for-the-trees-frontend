// Map logic for setting the view (zoom and position)

/**
 * Zooms the map in to the given location, smoothly panning to the desired location.
 * @param location the lat/lng location to zoom to
 * @param map the map
 * @param zoomLevel the level to zoom to between 16 and 22 where zooming in increases zoom level
 */
export function zoomToLocation(
  location: google.maps.LatLng,
  map: google.maps.Map,
  zoomLevel: number,
): void {
  map.setZoom(zoomLevel);
  map.panTo(location);
}

/**
 * Zooms in to the given place and sets the given marker to appear at that place.
 * Does nothing if the place does not have a location (invalid place).
 * @param place the place to go to
 * @param marker the marker to set at the place
 * @param map the map to zoom
 * @param zoomLevel the level to zoom to between 16 and 22 where zooming in increases zoom level
 */
export function goToPlace(
  place: google.maps.places.PlaceResult,
  marker: google.maps.Marker,
  map: google.maps.Map,
  zoomLevel: number,
): void {
  if (place.geometry) {
    marker.setPosition(place.geometry.location);
    zoomToLocation(place.geometry.location, map, zoomLevel);
  }
}
