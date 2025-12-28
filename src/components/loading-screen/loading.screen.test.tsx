import { render } from '@testing-library/react';
import LoadingScreen from './loading-screen';

describe('Component: LoadingScreen', () => {
  it('should render loading spinner', () => {
    render(<LoadingScreen />);

    // Проверяем наличие элемента с анимацией
    const spinner = document.querySelector('span');
    expect(spinner).toBeInTheDocument();
  });

  it('should have keyframes animation in style tag', () => {
    render(<LoadingScreen />);

    const styleTag = document.querySelector('style');
    expect(styleTag).toBeInTheDocument();
    expect(styleTag?.textContent).toContain('@keyframes rotation');
  });
});
