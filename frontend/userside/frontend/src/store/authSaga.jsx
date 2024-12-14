import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
} from './authSlice';
import api from '../Api/api';

// Register user
function* registerUser(action) {
  try {
    const response = yield call(api.post, '/register', action.payload);
    yield put(registerSuccess(response.data));
  } catch (error) {
    yield put(registerFailure(error.response.data.message));
  }
}

// Login user
function* loginUser(action) {
  try {
    const response = yield call(api.post, '/user-login', action.payload);
    yield put(loginSuccess(response.data));
  } catch (error) {
    yield put(loginFailure(error.response.data.message));
  }
}

// Watch for actions
function* authSaga() {
  yield takeLatest(registerStart.type, registerUser);
  yield takeLatest(loginStart.type, loginUser);
}

export default authSaga;