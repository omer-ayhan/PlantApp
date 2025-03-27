import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

function useAppNavigation<
  T extends NavigationRouteNames = NavigationRouteNames,
>() {
  return useNavigation<
    NativeStackNavigationProp<
      AllNavigationRoutes,
      Extract<T, keyof AllNavigationRoutes>
    >
  >();
}

export default useAppNavigation;
