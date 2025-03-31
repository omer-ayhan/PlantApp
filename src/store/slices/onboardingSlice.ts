import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface OnboardingState {
  hasCompletedOnboarding: boolean;
}

const initialState: OnboardingState = {
  hasCompletedOnboarding: false,
};

export const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setOnboardingCompleted: (state, action: PayloadAction<boolean>) => {
      state.hasCompletedOnboarding = action.payload;
    },
  },
});

export const {setOnboardingCompleted} = onboardingSlice.actions;

export default onboardingSlice.reducer;
