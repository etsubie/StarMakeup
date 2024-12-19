// pages/manager/EditRole.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditRole = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [roleName, setRoleName] = useState('');
  const [loading, setLoading] = useState(false);
  const roleId = location.state?.roleId;

  // Staff form state
  const [staffName, setStaffName] = useState('');
  const [staffUsername, setStaffUsername] = useState('');
  const [staffPassword, setStaffPassword] = useState('');
  const [staffPasswordConfirmation, setStaffPasswordConfirmation] = useState('');
  const [staffPhone, setStaffPhone] = useState('');
  const [staffRole, setStaffRole] = useState('');

  const apiUrl = 'http://localhost:4200/api/roles';
  const staffApiUrl = 'http://localhost:4200/api/staffs';

  useEffect(() => {
    if (roleId) {
      fetchRole();
    }
  }, [roleId]);

  const fetchRole = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/${roleId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setRoleName(response.data.data.name || '');
    } catch (error) {
      console.error('Error fetching role:', error);
      toast.error('Error fetching role.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${apiUrl}/${roleId}`, { name: roleName }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      toast.success(`Role "${roleName}" updated successfully!`);
      navigate('/manager/RoleManage');
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Error updating role.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStaff = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (staffPassword !== staffPasswordConfirmation) {
      toast.error('Passwords do not match!');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(staffApiUrl, {
        name: staffName,
        username: staffUsername,
        password: staffPassword,
        phone: staffPhone,
        roleName: roleName,
        passwordConfirmation: staffPasswordConfirmation,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      toast.success(`Staff "${response.data.staff.name}" created successfully!`);
      setStaffName('');
      setStaffUsername('');
      setStaffPassword('');
      setStaffPasswordConfirmation('');
      setStaffPhone('');
      setStaffRole('');
    } catch (error) {
      console.error('Error creating staff user:', error);
      toast.error('Error creating staff user.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-md w-full max-w-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Edit Role</h1>
        {loading && <p className="text-gray-500 text-center">Loading...</p>}

        <form onSubmit={handleUpdateRole} className="mb-6">
          <input
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            placeholder="Role Name"
            required
            className="border border-gray-300 rounded-md p-3 w-full mb-4 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-md px-4 py-2 w-full hover:bg-blue-700 transition duration-200 text-sm"
          >
            Update Role
          </button>
        </form>

        <h2 className="text-xl font-semibold text-center mb-4">Add Staff User</h2>
        <form onSubmit={handleCreateStaff}>
          <input
            type="text"
            value={staffName}
            onChange={(e) => setStaffName(e.target.value)}
            placeholder="Staff Name"
            required
            className="border border-gray-300 rounded-md p-3 w-full mb-4 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            value={staffUsername}
            onChange={(e) => setStaffUsername(e.target.value)}
            placeholder="Staff Username"
            required
            className="border border-gray-300 rounded-md p-3 w-full mb-4 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            value={staffPassword}
            onChange={(e) => setStaffPassword(e.target.value)}
            placeholder="Staff Password"
            required
            className="border border-gray-300 rounded-md p-3 w-full mb-4 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            value={staffPasswordConfirmation}
            onChange={(e) => setStaffPasswordConfirmation(e.target.value)}
            placeholder="Confirm Password"
            required
            className="border border-gray-300 rounded-md p-3 w-full mb-4 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            value={staffPhone}
            onChange={(e) => setStaffPhone(e.target.value)}
            placeholder="Staff Phone"
            required
            className="border border-gray-300 rounded-md p-3 w-full mb-4 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            value={staffRole}
            onChange={(e) => setStaffRole(e.target.value)}
            placeholder="Staff Role Name"
            required
            className="border border-gray-300 rounded-md p-3 w-full mb-4 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-600 text-white rounded-md px-4 py-2 w-full hover:bg-green-700 transition duration-200 text-sm"
          >
            Create Staff
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditRole;