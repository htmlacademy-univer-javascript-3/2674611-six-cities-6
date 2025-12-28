import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NearPlacesOffersList from './near-places-offers-list';
import { Offer } from '../../../types/offer';

const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'Near Offer 1',
    type: 'apartment',
    price: 100,
    city: {
      name: 'Paris',
      location: { latitude: 0, longitude: 0, zoom: 10 }
    },
    location: { latitude: 0, longitude: 0, zoom: 10 },
    isFavorite: false,
    isPremium: true,
    rating: 4.5,
    previewImage: 'img1.jpg'
  },
  {
    id: '2',
    title: 'Near Offer 2',
    type: 'house',
    price: 200,
    city: {
      name: 'Paris',
      location: { latitude: 0, longitude: 0, zoom: 10 }
    },
    location: { latitude: 0, longitude: 0, zoom: 10 },
    isFavorite: true,
    isPremium: false,
    rating: 4.0,
    previewImage: 'img2.jpg'
  }
];

describe('Component: NearPlacesOffersList', () => {
  it('should render list of near offers', () => {
    render(
      <MemoryRouter>
        <NearPlacesOffersList offers={mockOffers} />
      </MemoryRouter>
    );

    expect(screen.getByText('Near Offer 1')).toBeInTheDocument();
    expect(screen.getByText('Near Offer 2')).toBeInTheDocument();
    expect(screen.getAllByAltText('Place image')).toHaveLength(2);
  });

  it('should render empty list when no offers', () => {
    render(
      <MemoryRouter>
        <NearPlacesOffersList offers={[]} />
      </MemoryRouter>
    );

    expect(screen.queryByText('Near Offer 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Near Offer 2')).not.toBeInTheDocument();
  });

  it('should have correct CSS classes', () => {
    const { container } = render(
      <MemoryRouter>
        <NearPlacesOffersList offers={mockOffers} />
      </MemoryRouter>
    );

    const list = container.querySelector('.near-places__list');
    expect(list).toBeInTheDocument();
    expect(list).toHaveClass('places__list');
  });

  it('should render correct number of offers', () => {
    render(
      <MemoryRouter>
        <NearPlacesOffersList offers={mockOffers} />
      </MemoryRouter>
    );

    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(2);
  });

  it('should pass correct cardType to OfferCard components', () => {
    const { container } = render(
      <MemoryRouter>
        <NearPlacesOffersList offers={mockOffers} />
      </MemoryRouter>
    );

    const offerCards = container.querySelectorAll('article');
    offerCards.forEach((card) => {
      expect(card).toHaveClass('near-places__card');
    });
  });

  it('should render offers with correct keys', () => {
    render(
      <MemoryRouter>
        <NearPlacesOffersList offers={mockOffers} />
      </MemoryRouter>
    );

    const firstOfferLink = screen.getByRole('link', { name: 'Near Offer 1' });
    expect(firstOfferLink).toHaveAttribute('href', '/offer/1');

    const secondOfferLink = screen.getByRole('link', { name: 'Near Offer 2' });
    expect(secondOfferLink).toHaveAttribute('href', '/offer/2');
  });
});
