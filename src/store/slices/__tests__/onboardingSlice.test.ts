import {configureStore} from '@reduxjs/toolkit';
import type {RootState} from '@app/store';

import onboardingReducer, {
  setOnboardingCompleted,
} from '@app/store/slices/onboardingSlice';

describe('Onboarding Slice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        onboarding: onboardingReducer,
      },
    });
  });

  it('should handle initial state', () => {
    const state = store.getState();
    expect(state).toBeDefined();
  });

  it('should handle actions', () => {
    store.dispatch(setOnboardingCompleted(true));
    const state = store.getState() as RootState;
    expect(state.onboarding.hasCompletedOnboarding).toBe(true);
  });
});
