import { Icon, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect } from 'react';
import { Offer } from '../../../types/offer';
import useMap from '../../../hooks/useMap';
import { MarkerUrl } from '../../../const';


type MapProps = {
  offers: Offer[];
  selectedOffer: number | null;
};

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

function Map(props: MapProps): JSX.Element {
  const {offers, selectedOffer} = props;
  const city = offers[0].city;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.city.location.latitude,
          lng: offer.city.location.longitude,
        });

        marker
          .setIcon(
            selectedOffer !== null && offer.id === selectedOffer
              ? activeIcon
              : defaultIcon,
          )
          .addTo(map);
      });
    }
  }, [map, offers, selectedOffer]);

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
      }}
      ref={mapRef}
    >
    </div>
  );
}

export default Map;
