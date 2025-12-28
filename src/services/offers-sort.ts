import {Offers} from '../types/offer.ts';

type OfferSorting = {
  name: string;
  sort: (offers: Offers) => Offers ;
}

export const offerSortings: OfferSorting[] = [
  {
    name: 'Popular',
    sort: (offers) => [...offers]
  },
  {
    name: 'Price: low to high',
    sort: (offers) => [...offers].sort((a, b) => a.price - b.price)
  },
  {
    name: 'Price: high to low',
    sort: (offers) => [...offers].sort((a, b) => b.price - a.price)
  },
  {
    name: 'Top rated first',
    sort: (offers) => [...offers].sort((a, b) => b.rating - a.rating)
  }
];

export const offerSortingsMap = new Map<string, (offers: Offers) => Offers>(
  offerSortings.map((sorting) => [sorting.name, sorting.sort])
);

export const getDefaultSortName = () =>
  Array.from(offerSortingsMap.keys())[0];
