import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, 
    // FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
 } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from '../reducers/userReducer';
import xsrfReducer from '../reducers/xsrfReducer';

const persistConfig = {
    key: 'template',
    storage,
};
 
const rootReducer = combineReducers({
    user: userReducer,
    xsrfToken : xsrfReducer,
    // Ajoutez d'autres reducers ici si nécessaire
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //         serializableCheck: {
    //             ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //         },
    //     }),
});

export const persistor = persistStore(store);

