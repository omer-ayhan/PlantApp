import {configureStore} from '@reduxjs/toolkit';

import onboardingReducer from '@app/store/slices/onboardingSlice';
import type {RootState} from '@app/store';

describe('Redux Store', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        onboarding: onboardingReducer,
      },
    });
  });

  it('should create store with correct initial state', () => {
    expect(store.getState()).toBeDefined();
  });

  it('should have the expected reducer keys', () => {
    const state = store.getState() as RootState;
    const expectedKeys = ['onboarding'];

    expect(Object.keys(state)).toEqual(expect.arrayContaining(expectedKeys));
  });
});
