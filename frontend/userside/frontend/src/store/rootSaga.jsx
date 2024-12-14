import { all } from "redux-saga/effects";
import authSaga from "./authSaga";
import courseSaga from './courseSaga';
import studentSaga from './studentSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    courseSaga(),
    studentSaga()
  ]);
}