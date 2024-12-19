import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  createRoleStart,
  createRoleSuccess,
  createRoleFailure,
  fetchRolesStart,
  fetchRolesSuccess,
  fetchRolesFailure,
  updateRoleStart,
  updateRoleSuccess,
  updateRoleFailure,
  deleteRoleStart,
  deleteRoleSuccess,
  deleteRoleFailure,
} from './rolesSlice';

// API call functions
const fetchRoles = async () => {
  const response = await axios.get('/api/roles');
  return response.data;
};

const createRole = async (roleData) => {
  const response = await axios.post('/api/roles', roleData);
  return response.data;
};

const updateRole = async ({ id, data }) => {
  const response = await axios.patch(`/api/roles/${id}`, data);
  return response.data;
};

const deleteRole = async (id) => {
  const response = await axios.delete(`/api/roles/${id}`);
  return response.data;
};

// Fetch roles saga
function* fetchRolesSaga() {
  try {
    const data = yield call(fetchRoles);
    yield put(fetchRolesSuccess(data));
  } catch (error) {
    console.error('Error fetching roles:', error);  // Log error for debugging
    yield put(fetchRolesFailure(error.message || 'Failed to fetch roles'));
  }
}

// Create role saga
function* createRoleSaga(action) {
  try {
    const data = yield call(createRole, action.payload);
    yield put(createRoleSuccess(data));
  } catch (error) {
    console.error('Error creating role:', error);
    yield put(createRoleFailure(error.message || 'Failed to create role'));
  }
}

// Update role saga
function* updateRoleSaga(action) {
  try {
    const data = yield call(updateRole, action.payload);
    yield put(updateRoleSuccess(data));
  } catch (error) {
    console.error('Error updating role:', error);
    yield put(updateRoleFailure(error.message || 'Failed to update role'));
  }
}

// Delete role saga
function* deleteRoleSaga(action) {
  try {
    yield call(deleteRole, action.payload);
    yield put(deleteRoleSuccess(action.payload));
  } catch (error) {
    console.error('Error deleting role:', error);
    yield put(deleteRoleFailure(error.message || 'Failed to delete role'));
  }
}

// Watcher saga
export default function* rolesSaga() {
  yield takeLatest(fetchRolesStart.type, fetchRolesSaga);
  yield takeLatest(createRoleStart.type, createRoleSaga);
  yield takeLatest(updateRoleStart.type, updateRoleSaga);
  yield takeLatest(deleteRoleStart.type, deleteRoleSaga);
}
