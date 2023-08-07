import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import rootReducer from './reducers';

const customMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const persistConfig = {
  key: 'root',
  storage,
};

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: customMiddleware,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
