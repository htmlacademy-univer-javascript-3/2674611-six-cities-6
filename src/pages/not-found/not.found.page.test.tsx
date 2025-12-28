import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFoundPage from './not-found-page';

describe('Component: NotFoundPage', () => {
  it('should render 404 page with correct content', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByText('Go to Homepage')).toBeInTheDocument();
  });

  it('should have link to homepage', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: 'Go to Homepage' });
    expect(link).toHaveAttribute('href', '/');
  });
});
