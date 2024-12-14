import { configureStore } from '@reduxjs/toolkit';
import userReducer from './authSlice';
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import authReducer from "./userSlice";
import courseReducer from "./courseSlice";
import studentReducer from "./studentSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    courses: courseReducer,
    student: studentReducer,

  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  
  });
  
  sagaMiddleware.run(rootSaga);

export default store;







