import { createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

import rootReducer from './reducers'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: hardSet
};

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(pReducer);
const persistor = persistStore(store);

export { store, persistor }