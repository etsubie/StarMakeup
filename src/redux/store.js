import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rolesReducer from './rolesSlice';
import rolesSaga from './rolesSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    roles: rolesReducer,  // Ensure the roles reducer is set correctly
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rolesSaga);

export default store;
