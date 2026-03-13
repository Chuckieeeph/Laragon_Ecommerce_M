import { render, screen } from '@testing-library/react';
import App from './App';

test('renders brand and featured section', () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { level: 1, name: /ShopX Studio/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/Featured Picks/i)).toBeInTheDocument();
});
