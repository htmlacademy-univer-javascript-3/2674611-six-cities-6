import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import CitiesOffersList from './cities-offers-list';
import { Offer } from '../../../types/offer';

const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'Offer 1',
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
    title: 'Offer 2',
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

describe('Component: CitiesOffersList', () => {
  const mockOnActiveOfferChange = vi.fn();

  beforeEach(() => {
    mockOnActiveOfferChange.mockClear();
  });

  it('should render list of offers', () => {
    render(
      <MemoryRouter>
        <CitiesOffersList
          offers={mockOffers}
          onActiveOfferChange={mockOnActiveOfferChange}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Offer 1')).toBeInTheDocument();
    expect(screen.getByText('Offer 2')).toBeInTheDocument();
    expect(screen.getAllByAltText('Place image')).toHaveLength(2);
  });

  it('should render empty list when no offers', () => {
    render(
      <MemoryRouter>
        <CitiesOffersList
          offers={[]}
          onActiveOfferChange={mockOnActiveOfferChange}
        />
      </MemoryRouter>
    );

    expect(screen.queryByText('Offer 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Offer 2')).not.toBeInTheDocument();
  });

  it('should call onActiveOfferChange with offer when mouse enters offer card', async () => {
    render(
      <MemoryRouter>
        <CitiesOffersList
          offers={mockOffers}
          onActiveOfferChange={mockOnActiveOfferChange}
        />
      </MemoryRouter>
    );

    const firstOffer = screen.getByText('Offer 1').closest('article');

    if (firstOffer) {
      await userEvent.hover(firstOffer);
    }

    expect(mockOnActiveOfferChange).toHaveBeenCalledTimes(1);
    expect(mockOnActiveOfferChange).toHaveBeenCalledWith(mockOffers[0]);
  });

  it('should call onActiveOfferChange with null when mouse leaves offer card', async () => {
    render(
      <MemoryRouter>
        <CitiesOffersList
          offers={mockOffers}
          onActiveOfferChange={mockOnActiveOfferChange}
        />
      </MemoryRouter>
    );

    const firstOffer = screen.getByText('Offer 1').closest('article');

    if (firstOffer) {
      await userEvent.hover(firstOffer);
      await userEvent.unhover(firstOffer);
    }

    expect(mockOnActiveOfferChange).toHaveBeenCalledTimes(2);
    expect(mockOnActiveOfferChange).toHaveBeenLastCalledWith(null);
  });

  it('should have correct CSS classes', () => {
    render(
      <MemoryRouter>
        <CitiesOffersList
          offers={mockOffers}
          onActiveOfferChange={mockOnActiveOfferChange}
        />
      </MemoryRouter>
    );

    const list = screen.getByText('Offer 1').closest('div.cities__places-list');
    expect(list).toBeInTheDocument();
    expect(list).toHaveClass('cities__places-list');
    expect(list).toHaveClass('places__list');
    expect(list).toHaveClass('tabs__content');
  });

  it('should render each offer with correct key', () => {
    render(
      <MemoryRouter>
        <CitiesOffersList
          offers={mockOffers}
          onActiveOfferChange={mockOnActiveOfferChange}
        />
      </MemoryRouter>
    );

    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(2);
  });
});
