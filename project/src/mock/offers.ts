import { Offer } from '../types/offer';

// const OFFERS_TO_SHOW = 4;

const offer1: Offer = {
  id: 1,
  bedrooms: 3,
  city: {
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
    },
    name: 'Amsterdam',
  },
  description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
  goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
  host: {
    avatarUrl: 'img/avatar-angelina.jpg',
    id: 1,
    isPro: true,
    name: 'Angelina',
  },
  images: [
    'img/apartment-01.jpg',
    'img/room.jpg',
    'img/apartment-02.jpg',
    'img/studio-01.jpg',
    'img/apartment-03.jpg',
    'img/apartment-01.jpg',
  ],
  isFavorite: true,
  isPremium: false,
  location: {
    latitude: 52.3909553943508,
    longitude: 4.85309666406198,
    zoom: 8,
  },
  maxAdults: 4,
  previewImage: 'img/room.jpg',
  price: 120,
  rating: 4.8,
  title: 'Beautiful & luxurious studio at great location',
  type: 'apartment',
};

const offer2 = Object.assign(
  {},
  offer1,
  {
    id: 2,
    city: {
      location: {
        latitude: 52.369553943508,
        longitude: 4.85309666406198,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    isPremium: true,
    price: 100,
    previewImage: 'img/apartment-01.jpg',
  },
);

const offer3 = Object.assign(
  {},
  offer1,
  {
    id: 3,
    price: 20,
    rating: 3.1,
    city: {
      location: {
        latitude: 52.3909553943508,
        longitude: 4.929309666406198,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    previewImage: 'img/apartment-02.jpg',
  },
);

const offer4 = Object.assign(
  {},
  offer1,
  {
    id: 4,
    city: {
      location: {
        latitude: 52.3809553943508,
        longitude: 4.939309666406198,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    rating: 3.4,
    previewImage: 'img/apartment-03.jpg',
    isFavorite: false,
  },
);

export const offers: Offer[] = [offer1, offer2, offer3, offer4];
// export const offers: Offer[] = new Array(OFFERS_TO_SHOW).fill(null).map((value, index) => Object.assign({}, offer, {id: index + 1}));
