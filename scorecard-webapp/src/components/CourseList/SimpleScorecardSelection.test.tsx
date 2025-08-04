import { render, screen, fireEvent } from '@testing-library/react';
import { AppStateContext } from '../../context/context';
import SimpleScorecardSelection from './SimpleScorecardSelection';
import { vi, describe, it, expect } from 'vitest';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('SimpleScorecardSelection', () => {
  it('starts a simple 9-hole scorecard', () => {
    const setCourse = vi.fn();
    render(
      <AppStateContext.Provider value={{ course: null, setCourse }}>
        <SimpleScorecardSelection />
      </AppStateContext.Provider>,
    );

    fireEvent.click(screen.getByText('9 Holes'));

    expect(setCourse).toHaveBeenCalledWith({
      name: 'Simple 9 Holes',
      holes: Array.from({ length: 9 }, (_, i) => ({ number: i + 1, par: 0 })),
    });
    expect(mockNavigate).toHaveBeenCalledWith('/play');
  });
});
