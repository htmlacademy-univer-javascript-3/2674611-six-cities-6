import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './private-route';
import { AuthorizationStatus } from '../../const';

describe('Component: PrivateRoute', () => {
  const ProtectedComponent = () => <div>Protected Content</div>;
  const LoginComponent = () => <div>Login Page</div>;

  it('should render children when user is authorized', () => {
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/protected"
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <ProtectedComponent />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginComponent />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });

  it('should redirect to login when user is not authorized', () => {
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/protected"
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
                <ProtectedComponent />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginComponent />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('should redirect to login when authorization status is unknown', () => {
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/protected"
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Unknown}>
                <ProtectedComponent />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginComponent />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('should preserve nested routing structure', () => {
    const NestedComponent = () => (
      <div>
        <h1>Nested Protected</h1>
        <p>Some content</p>
      </div>
    );

    render(
      <MemoryRouter initialEntries={['/nested']}>
        <Routes>
          <Route
            path="/nested"
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <NestedComponent />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginComponent />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Nested Protected')).toBeInTheDocument();
    expect(screen.getByText('Some content')).toBeInTheDocument();
  });
});
