import 'leaflet/dist/leaflet.css';
import leaflet, {layerGroup, Marker} from 'leaflet';
import {useEffect, useRef} from 'react';
import useMap from '../../hooks/use-map.ts';
import {Location} from '../../types/offer.ts';

type MapProps = {
  mapType?: 'offer' | 'city';
  locations: Location[];
  selectedPoint: Location | null;
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = leaflet.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map(props: MapProps): JSX.Element {
  const {mapType, locations, selectedPoint} = props;

  const mapRef = useRef(null);

  const map = useMap(mapRef, locations[0]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      locations.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude
        });

        marker
          .setIcon(
            selectedPoint !== undefined && point === selectedPoint
              ? currentCustomIcon
              :
              defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      if (map && locations.length > 0) {
        map.setView([locations[0].latitude, locations[0].longitude], map.getZoom());
      }

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, locations, selectedPoint]);


  const mapClass = mapType === 'offer' ? 'offer__map map' : 'cities__map map';

  return (
    <section
      ref={mapRef}
      className={mapClass}
      style={{backgroundImage: 'none'}}
    />
  );
}

export default Map;
