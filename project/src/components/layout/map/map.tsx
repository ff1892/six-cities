import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import useMap from '../../../hooks/useMap';
import { MarkerUrl } from '../../../const';
import leaflet, { LayerGroup, Icon, Marker } from 'leaflet';
import { Offer } from '../../../types/offer';

const defaultIcon = new Icon({
  iconUrl: MarkerUrl.Default,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

const activeIcon = new Icon({
  iconUrl: MarkerUrl.Active,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

type MapProps = {
  selectedOffer: number | null,
  offers: Offer[],
};

function Map({offers, selectedOffer}: MapProps): JSX.Element {

  const markersRef = useRef<LayerGroup>(new leaflet.LayerGroup());
  const mapRef = useRef(null);

  const city = offers[0].city;
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (!map) {
      return;
    }

    markersRef.current.clearLayers();

    const {
      location: {
        latitude,
        longitude,
        zoom },
    } = city;

    map.flyTo([latitude, longitude], zoom);

    offers.forEach((offer) => {
      const marker = new Marker({
        lat: offer.location.latitude,
        lng: offer.location.longitude,
      });

      const isHovered = selectedOffer && offer.id === selectedOffer;

      marker.setIcon(
        isHovered
          ? activeIcon
          : defaultIcon)
        .addTo(markersRef.current);

      isHovered && map.flyTo(
        [
          offer.location.latitude,
          offer.location.longitude,
        ],
        offer.location.zoom);
    });

    markersRef.current.addTo(map);
  },

  [selectedOffer, city, map, offers]);

  return (
    <div
      style={{
        height: '100%',
      }}
      ref={mapRef}
    />
  );
}

export default Map;
