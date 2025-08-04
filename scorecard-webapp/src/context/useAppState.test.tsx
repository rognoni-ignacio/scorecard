import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useAppState } from './useAppState';
import { AppStateContext } from './context';
import type { ReactNode } from 'react';

describe('useAppState', () => {
  it('throws when used outside provider', () => {
    const { result } = renderHook(() => useAppState());
    expect(result.error).toEqual(new Error('useAppState must be used within an AppStateProvider'));
  });

  it('returns context when used inside provider', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <AppStateContext.Provider value={{ course: null, setCourse: vi.fn() }}>
        {children}
      </AppStateContext.Provider>
    );

    const { result } = renderHook(() => useAppState(), { wrapper });
    expect(result.current.course).toBeNull();
  });
});
