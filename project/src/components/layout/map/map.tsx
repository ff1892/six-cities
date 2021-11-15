import 'leaflet/dist/leaflet.css';
import leaflet, { LayerGroup, Icon, Marker, Circle } from 'leaflet';
import { useEffect, useRef } from 'react';
import { Offer } from '../../../types/offer';
import { MarkerUrl } from '../../../const';
import useMap from '../../../hooks/use-map';

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

const createMainOfferCircle = (lat: number, lng: number) => (
  new Circle (
    [lat, lng],
    600,
    { fillColor: '#5199FF',
      fillOpacity: 0.1,
      opacity: 0,
    },
  )
);

type MapProps = {
  selectedOffer: number | null,
  offers: Offer[],
  mainOffer?: Offer;
};

function Map({offers, selectedOffer, mainOffer}: MapProps): JSX.Element {

  const markersRef = useRef<LayerGroup>(new leaflet.LayerGroup());
  const mapRef = useRef(null);

  const city = mainOffer ? mainOffer.city: offers[0].city;
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
      const hoveredIcon = mainOffer ? defaultIcon : activeIcon;

      marker.setIcon(
        isHovered
          ? hoveredIcon
          : defaultIcon)
        .addTo(markersRef.current);

      isHovered && map.flyTo(
        [
          offer.location.latitude,
          offer.location.longitude,
        ],
        offer.location.zoom);

      if (mainOffer) {
        const mainMarker = new Marker({
          lat: mainOffer.location.latitude,
          lng: mainOffer.location.longitude,
        });
        mainMarker.setIcon(activeIcon)
          .addTo(markersRef.current);

        const mainOfferCircle = createMainOfferCircle(
          mainOffer.location.latitude, mainOffer.location.longitude);
        mainOfferCircle.addTo(markersRef.current);
      }
    });

    markersRef.current.addTo(map);
  },

  [selectedOffer, city, map, offers, mainOffer]);

  return (
    <div
      data-testid="map component"
      style={{
        height: '100%',
      }}
      ref={mapRef}
    />
  );
}

export default Map;
