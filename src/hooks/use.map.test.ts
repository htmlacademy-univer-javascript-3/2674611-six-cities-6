import { renderHook } from '@testing-library/react';
import useMap from './use-map';
import { Location } from '../types/offer';

vi.mock('leaflet', () => {
  const mockMap = {
    setView: vi.fn(),
    remove: vi.fn(),
    addLayer: vi.fn(),
  };

  const mockTileLayer = vi.fn();

  return {
    Map: vi.fn(() => mockMap),
    TileLayer: mockTileLayer,
  };
});

describe('Hook: useMap', () => {
  const mockLocation: Location = {
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 12,
  };

  const mockElement = document.createElement('div');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return null when mapRef is null', () => {
    const ref = { current: null };

    const { result } = renderHook(() =>
      useMap(ref, mockLocation)
    );

    expect(result.current).toBeNull();
  });

  it('should create map instance when ref contains element', async () => {
    const { Map: MockMap } = await import('leaflet');
    const ref = { current: mockElement };

    const { result } = renderHook(() =>
      useMap(ref, mockLocation)
    );

    expect(MockMap).toHaveBeenCalledTimes(1);
    expect(MockMap).toHaveBeenCalledWith(mockElement, {
      center: {
        lat: mockLocation.latitude,
        lng: mockLocation.longitude,
      },
      zoom: mockLocation.zoom,
    });

    expect(result.current).not.toBeNull();
  });

  it('should create map only once even on re-renders', async () => {
    const { Map: MockMap } = await import('leaflet');
    const ref = { current: mockElement };

    const { rerender } = renderHook(
      ({ location }) => useMap(ref, location),
      { initialProps: { location: mockLocation } }
    );

    expect(MockMap).toHaveBeenCalledTimes(1);

    rerender({ location: { ...mockLocation, zoom: 13 } });

    expect(MockMap).toHaveBeenCalledTimes(1);
  });
});
