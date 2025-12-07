import 'leaflet/dist/leaflet.css';
import {Point, Points} from '../../types/map.ts';
import leaflet, {layerGroup, Marker} from 'leaflet';
import {useEffect, useRef} from 'react';
import useMap from '../../hooks/useMap.ts';

type MapProps = {
  mapType?: 'offer' | 'city';
  points: Points;
  selectedPoint: Point | null;
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
  const {mapType, points, selectedPoint} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, points[0]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.lat,
          lng: point.lng
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

      if (map && points.length > 0) {
        map.setView([points[0].lat, points[0].lng], map.getZoom());
      }

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint]);


  const mapClass = mapType === 'offer' ? 'offer__map map' : 'cities__map map';

  return (
    <section
      ref={mapRef}
      className={mapClass}
      style={{ backgroundImage: 'none' }}
    />
  );
}

export default Map;
