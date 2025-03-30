import {NavigatorScreenParams} from '@react-navigation/native';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }

  type RootStackParamList = {
    OnboardingStack: NavigatorScreenParams<OnboardingStackParamList>;
    MainTabs: NavigatorScreenParams<MainTabsParamList>;
    Paywall: undefined;
    Scan: undefined;
    Chat: undefined;
  };

  type OnboardingStackParamList = {
    OnboardingWelcome: undefined;
    OnboardingInfo: undefined;
  };

  type MainTabsParamList = {
    Home: undefined;
    Diagnose: undefined;
    MyGarden: undefined;
    Profile: undefined;
  };

  type NavigationRouteNames =
    | keyof RootStackParamList
    | keyof OnboardingStackParamList
    | keyof MainTabsParamList;

  type AllNavigationRoutes = RootStackParamList &
    OnboardingStackParamList &
    MainTabsParamList;
}
