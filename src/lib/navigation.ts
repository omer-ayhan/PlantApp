import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

type NavigateFunction = <T extends NavigationRouteNames>(
  name: T,
  params?: Partial<AllNavigationRoutes[T]>,
) => void;

const navigationRef = createNavigationContainerRef<AllNavigationRoutes>();

function navigate<T extends NavigationRouteNames>(
  name: T,
  params?: Partial<AllNavigationRoutes[T]>,
) {
  if (navigationRef.isReady()) {
    (navigationRef.navigate as NavigateFunction)(name, params);
  }
}

function push<T extends NavigationRouteNames>(
  name: T,
  params?: Partial<AllNavigationRoutes[T]>,
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(name as string, params));
  }
}

function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

export {navigationRef, navigate, push, goBack};
