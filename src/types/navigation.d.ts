import {NavigatorScreenParams} from '@react-navigation/native';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }

  type RootStackParamList = {
    OnboardingStack: NavigatorScreenParams<OnboardingStackParamList>;
    PaywallStack: NavigatorScreenParams<PaywallStackParamList>;
    MainTabs: NavigatorScreenParams<MainTabsParamList>;
    Scan: undefined;
    Chat: undefined;
  };

  type OnboardingStackParamList = {
    OnboardingWelcome: undefined;
    OnboardingInfo: undefined;
  };

  type PaywallStackParamList = {
    Paywall: undefined;
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
    | keyof PaywallStackParamList
    | keyof MainTabsParamList;

  type AllNavigationRoutes = RootStackParamList &
    OnboardingStackParamList &
    PaywallStackParamList &
    MainTabsParamList;
}
