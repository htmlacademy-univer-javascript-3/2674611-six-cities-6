import { Offers } from '../types/offer.ts';

export const testOffers: Offers = [
  {
    id: '1',
    title: 'Beautiful & luxurious apartment at great location',
    city: 'Amsterdam',
    type: 'Apartment',
    price: 120,
    rating: 4,
    isPremium: true,
    isFavorite: false,
    previewImage: 'img/apartment-01.jpg',
    location: {
      title: '',
      lat: 52.3909553943508,
      lng: 4.85309666406198,
    }
  },
  {
    id: '2',
    title: 'Wood and stone place',
    city: 'Amsterdam',
    type: 'Room',
    price: 80,
    rating: 4,
    isPremium: false,
    isFavorite: true,
    previewImage: 'img/room.jpg',
    location: {
      title: '',
      lat: 52.3609553943508,
      lng: 4.85309666406198,
    }
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
    previewImage: 'img/apartment-02.jpg',
    location: {
      title: '',
      lat: 52.3909553943508,
      lng: 4.929309666406198,
    }
  },
  {
    id: '4',
    title: 'Nice, cozy, warm big bed apartment',
    city: 'Amsterdam',
    type: 'Apartment',
    price: 180,
    rating: 5,
    isPremium: true,
    isFavorite: true,
    previewImage: 'img/apartment-03.jpg',
    location: {
      title: '',
      lat: 52.3809553943508,
      lng: 4.939309666406198,
    }
  },
  {
    id: '5',
    title: 'Stylish apartment in historic center',
    city: 'Paris',
    type: 'Apartment',
    price: 200,
    rating: 4.8,
    isPremium: true,
    isFavorite: false,
    previewImage: '',
    location: {
      title: '',
      lat: 48.856613,
      lng: 2.352222,
    }
  },
  {
    id: '6',
    title: 'Modern loft with cathedral view',
    city: 'Cologne',
    type: 'House',
    price: 150,
    rating: 4.5,
    isPremium: false,
    isFavorite: true,
    previewImage: '',
    location: {
      title: '',
      lat: 50.937531,
      lng: 6.960279,
    }
  },
  {
    id: '7',
    title: 'Cozy studio near Grand Place',
    city: 'Brussels',
    type: 'Room',
    price: 90,
    rating: 4.2,
    isPremium: false,
    isFavorite: false,
    previewImage: '',
    location: {
      title: '',
      lat: 50.846557,
      lng: 4.351697,
    }
  },
  {
    id: '8',
    title: 'Waterfront apartment in Speicherstadt',
    city: 'Hamburg',
    type: 'Apartment',
    price: 175,
    rating: 4.9,
    isPremium: true,
    isFavorite: true,
    previewImage: '',
    location: {
      title: '',
      lat: 53.548828,
      lng: 9.987170,
    }
  },
  {
    id: '9',
    title: 'Luxury hotel room in MedienHafen',
    city: 'Dusseldorf',
    type: 'Hotel',
    price: 220,
    rating: 4.7,
    isPremium: true,
    isFavorite: false,
    previewImage: '',
    location: {
      title: '',
      lat: 51.213270,
      lng: 6.773320,
    }
  }
];
