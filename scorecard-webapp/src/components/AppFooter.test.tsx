/// <reference types="vitest" />
import { render, screen } from '@testing-library/react';
import AppFooter from './AppFooter';

test('renders link to GitHub repository', () => {
  render(<AppFooter />);
  const link = screen.getByRole('link', { name: /github/i });
  expect(link).toHaveAttribute('href', 'https://github.com/rognoni-ignacio/scorecard');
});

