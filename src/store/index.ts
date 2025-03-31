import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import onboardingReducer from './slices/onboardingSlice';
import apiService from './api/apiService';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['onboarding'],
  blacklist: [apiService.reducerPath],
};

const rootReducer = combineReducers({
  onboarding: onboardingReducer,
  [apiService.reducerPath]: apiService.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const storeInstance = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiService.middleware),
});

const persistor = persistStore(storeInstance);

export type RootState = ReturnType<typeof storeInstance.getState>;
export type AppDispatch = typeof storeInstance.dispatch;

export default {storeInstance, persistor};
