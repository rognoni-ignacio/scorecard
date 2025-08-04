import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AppFooter from './AppFooter';

describe('AppFooter', () => {
  it('renders GitHub link', () => {
    render(<AppFooter />);
    const link = screen.getByRole('link', { name: /github/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://github.com/rognoni-ignacio/scorecard');
  });
});
