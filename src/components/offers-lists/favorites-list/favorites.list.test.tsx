import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FavoritesList from './favorites-list';
import { Offer } from '../../../types/offer';

const mockGroupedOffers: Record<string, Offer[]> = {
  'Paris': [
    {
      id: '1',
      title: 'Paris Offer 1',
      type: 'apartment',
      price: 100,
      city: { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 10 } },
      location: { latitude: 0, longitude: 0, zoom: 10 },
      isFavorite: true,
      isPremium: true,
      rating: 4.5,
      previewImage: 'img1.jpg'
    },
    {
      id: '2',
      title: 'Paris Offer 2',
      type: 'house',
      price: 200,
      city: { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 10 } },
      location: { latitude: 0, longitude: 0, zoom: 10 },
      isFavorite: true,
      isPremium: false,
      rating: 4.0,
      previewImage: 'img2.jpg'
    }
  ],
  'Cologne': [
    {
      id: '3',
      title: 'Cologne Offer',
      type: 'room',
      price: 80,
      city: { name: 'Cologne', location: { latitude: 0, longitude: 0, zoom: 10 } },
      location: { latitude: 0, longitude: 0, zoom: 10 },
      isFavorite: true,
      isPremium: false,
      rating: 3.5,
      previewImage: 'img3.jpg'
    }
  ]
};

describe('Component: FavoritesList', () => {
  it('should render grouped offers by city', () => {
    render(
      <MemoryRouter>
        <FavoritesList groupedOffers={mockGroupedOffers} />
      </MemoryRouter>
    );

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Cologne')).toBeInTheDocument();
    expect(screen.getByText('Paris Offer 1')).toBeInTheDocument();
    expect(screen.getByText('Paris Offer 2')).toBeInTheDocument();
    expect(screen.getByText('Cologne Offer')).toBeInTheDocument();
  });

  it('should render empty list when no grouped offers', () => {
    render(
      <MemoryRouter>
        <FavoritesList groupedOffers={{}} />
      </MemoryRouter>
    );

    expect(screen.queryByText('Paris')).not.toBeInTheDocument();
    expect(screen.queryByText('Cologne')).not.toBeInTheDocument();
  });

  it('should render correct number of city sections', () => {
    render(
      <MemoryRouter>
        <FavoritesList groupedOffers={mockGroupedOffers} />
      </MemoryRouter>
    );

    const citySections = screen.getAllByRole('listitem');
    expect(citySections).toHaveLength(2);
  });

  it('should render offers for each city', () => {
    render(
      <MemoryRouter>
        <FavoritesList groupedOffers={mockGroupedOffers} />
      </MemoryRouter>
    );

    const parisOffers = screen.getAllByText(/Paris Offer/);
    expect(parisOffers).toHaveLength(2);

    const cologneOffers = screen.getAllByText(/Cologne Offer/);
    expect(cologneOffers).toHaveLength(1);
  });

  it('should have correct CSS classes', () => {
    const { container } = render(
      <MemoryRouter>
        <FavoritesList groupedOffers={mockGroupedOffers} />
      </MemoryRouter>
    );

    const list = container.querySelector('.favorites__list');
    expect(list).toBeInTheDocument();

    const cityItems = container.querySelectorAll('.favorites__locations-items');
    expect(cityItems).toHaveLength(2);

    const places = container.querySelectorAll('.favorites__places');
    expect(places).toHaveLength(2);
  });

  it('should pass correct cardType to OfferCard components', () => {
    const { container } = render(
      <MemoryRouter>
        <FavoritesList groupedOffers={mockGroupedOffers} />
      </MemoryRouter>
    );

    const offerCards = container.querySelectorAll('article');
    offerCards.forEach((card) => {
      expect(card).toHaveClass('favorites__card');
    });
  });

  it('should render city names as links', () => {
    render(
      <MemoryRouter>
        <FavoritesList groupedOffers={mockGroupedOffers} />
      </MemoryRouter>
    );

    const cityLinks = screen.getAllByRole('link', { name: /Paris|Cologne/ });
    const filteredLinks = cityLinks.filter((link) =>
      link.className.includes('locations__item-link')
    );

    expect(filteredLinks).toHaveLength(2);

    filteredLinks.forEach((link) => {
      expect(link).toHaveClass('locations__item-link');
      expect(link).toHaveAttribute('href', '#');
    });
  });
});
