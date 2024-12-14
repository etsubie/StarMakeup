// src/redux/sagas/courseSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { fetchCoursesStart, fetchCoursesSuccess, fetchCoursesFailure } from './courseSlice';

function* fetchCoursesSaga() {
  try {
    const response = yield call(() => axios.get('http://localhost:4200/api/courses')); // Update the URL
    yield put(fetchCoursesSuccess(response.data.data));
  } catch (error) {
    yield put(fetchCoursesFailure(error.message));
  }
}

export default function* courseSaga() {
  yield takeLatest(fetchCoursesStart.type, fetchCoursesSaga);
}
