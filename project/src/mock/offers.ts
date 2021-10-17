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
  description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
  host: {
    avatarUrl: 'img/1.png',
    id: 1,
    isPro: true,
    name: 'Angelina',
  },
  images: ['img/1.png', 'img/2.png'],
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
    previewImage: 'img/apartment-01.jpg',
  },
);

const offer3 = Object.assign(
  {},
  offer1,
  {
    id: 3,
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
