export type Place = {
    latitude: number,
    longitude: number,
    zoom: number,
};

export type City = {
  location: Place,
  name: string,
};

export type Host = {
  avatarUrl: string,
  id: number,
  isPro: boolean,
  name: string,
};

export type Offer = {
  id: number,
  bedrooms: number,
  city: City,
  description: string,
  goods: string[],
  host: Host,
  images: string[],
  isFavorite: boolean,
  isPremium: boolean,
  location: Place,
  maxAdults: number,
  previewImage: string,
  price: number,
  rating: number,
  title: string,
  type: string,
};

export type OfferResponse = Omit<Offer,
 | 'host'
 | 'isFavorite'
 | 'isPremium'
 | 'maxAdults'
 | 'previewImage'
 > & {
    host: {
     'avatar_url': string,
     'id': number,
     'is_pro': boolean,
     'name': string,
   },
   'is_favorite': boolean,
   'is_premium': boolean,
   'max_adults': number,
   'preview_image': string,
 };
