import {Offers} from '../types/offer.ts';

export const testOffers : Offers = [
  {
    id: '1',
    title: 'Beautiful & luxurious apartment at great location',
    city: 'Amsterdam',
    type: 'Apartment',
    price: 120,
    rating: 4,
    isPremium: true,
    isFavorite: false,
    previewImage: 'img/apartment-01.jpg'
  },
  {
    id: '2',
    title: 'Wood and stone place',
    city: 'Cologne',
    type: 'Room',
    price: 80,
    rating: 4,
    isPremium: false,
    isFavorite: true,
    previewImage: 'img/room.jpg'
  },
  {
    id: '3',
    title: 'Canal View Prinsengracht',
    city: 'Amsterdam',
    type: 'Apartment',
    price: 132,
    rating: 4,
    isPremium: false,
    isFavorite: false,
    previewImage: 'img/apartment-02.jpg'
  },
  {
    id: '4',
    title: 'Nice, cozy, warm big bed apartment',
    city: 'Amsterdam',
    type: 'Apartment',
    price: 180,
    rating: 5,
    isPremium: true,
    isFavorite: false,
    previewImage: 'img/apartment-03.jpg'
  },
  {
    id: '5',
    title: 'Wood and stone place',
    city: 'Amsterdam',
    type: 'Room',
    price: 80,
    rating: 4,
    isPremium: false,
    isFavorite: true,
    previewImage: 'img/room.jpg'
  }
];
