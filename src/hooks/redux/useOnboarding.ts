import {useAppDispatch, useAppSelector} from '@app/hooks/useReduxHooks';
import {setOnboardingCompleted} from '@app/store/slices/onboardingSlice';

const useOnboarding = () => {
  const dispatch = useAppDispatch();
  const {hasCompletedOnboarding} = useAppSelector(state => state.onboarding);

  const completeOnboarding = () => {
    dispatch(setOnboardingCompleted(true));
  };

  const resetOnboarding = () => {
    dispatch(setOnboardingCompleted(false));
  };

  return {
    hasCompletedOnboarding,
    completeOnboarding,
    resetOnboarding,
  };
};

export default useOnboarding;
