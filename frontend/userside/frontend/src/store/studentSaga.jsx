import { takeLatest, call, put } from 'redux-saga/effects';
import { registerStart, registerSuccess, registerFailure } from './studentSlice';
import axios from 'axios';

function* registerStudent(action) {
  try {
    const { courseId, ...studentData } = action.payload; 
    const response = yield call(
      axios.post,
      `http://localhost:4200/api/students/${courseId}/register`,
      studentData
    );
    yield put(registerSuccess(response.data));
  } catch (error) {
    yield put(registerFailure(error.response?.data?.message || 'Failed to register'));
  }
}


export default function* studentSaga() {
  yield takeLatest(registerStart.type, registerStudent);
}
