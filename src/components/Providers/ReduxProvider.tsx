import React from 'react';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import store from '@app/store';

type ReduxProviderProps = {
  children: React.ReactNode;
};

const ReduxProvider = ({children}: ReduxProviderProps) => {
  return (
    <Provider store={store.storeInstance}>
      <PersistGate loading={null} persistor={store.persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
