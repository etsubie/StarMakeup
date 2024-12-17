import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from './Sidebar'

const RoleManage = () => {
  const [roles, setRoles] = useState([]);
  const [roleName, setRoleName] = useState('');
  const [editingRole, setEditingRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [showStaffForm, setShowStaffForm] = useState(false);

  const [staffName, setStaffName] = useState('');
  const [staffUsername, setStaffUsername] = useState('');
  const [staffPassword, setStaffPassword] = useState('');
  const [staffPasswordConfirmation, setStaffPasswordConfirmation] = useState('');
  const [staffPhone, setStaffPhone] = useState('');
  const [staffRole, setStaffRole] = useState('');

  const apiUrl = 'http://localhost:4200/api/roles';
  const staffApiUrl = 'http://localhost:4200/api/staffs';

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setRoles(response.data.data || []);
    } catch (error) {
      console.error('Error fetching roles:', error);
      toast.error('Error fetching roles.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdateRole = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { name: roleName };

      if (editingRole) {
        await axios.put(`${apiUrl}/${editingRole._id}`, payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        toast.success(`Role "${roleName}" updated successfully!`);
      } else {
        await axios.post(apiUrl, payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        toast.success(`Role "${roleName}" created successfully!`);
      }
      setRoleName('');
      setEditingRole(null);
      fetchRoles();
      setShowStaffForm(true);
    } catch (error) {
      console.error('Error saving role:', error);
      toast.error('Error saving role.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
    setRoleName(role.name); // Populate the form with the selected role's name
    setShowStaffForm(true); // Optionally show the staff form if needed
  };

  const handleDeleteRole = async (id) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      setLoading(true);
      try {
        await axios.delete(`${apiUrl}/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        toast.success('Role deleted successfully!');
        fetchRoles();
      } catch (error) {
        console.error('Error deleting role:', error);
        toast.error('Error deleting role.');
      } finally {
        setLoading(false);
      }
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
        roleName: staffRole,
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

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Role Management</h1>
      {loading && <p className="text-gray-500">Loading...</p>}

      <h2 className="text-xl font-semibold mb-2">Search Roles</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by role name"
        className="border border-gray-300 rounded-md p-2 w-full mb-4"
      />

      <h2 className="text-xl font-semibold mb-2">Create/Edit Role</h2>
      <form onSubmit={handleCreateOrUpdateRole} className="mb-4">
        <input
          type="text"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          placeholder="Role Name"
          required
          className="border border-gray-300 rounded-md p-2 w-full mb-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md p-2 w-full hover:bg-blue-600 transition"
        >
          {editingRole ? 'Update Role' : 'Create Role'}
        </button>
      </form>

      {showStaffForm && (
        <>
          <h2 className="text-xl font-semibold mb-2">Add Staff User</h2>
          <form onSubmit={handleCreateStaff} className="mb-4">
            <input
              type="text"
              value={staffName}
              onChange={(e) => setStaffName(e.target.value)}
              placeholder="Staff Name"
              required
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
            />
            <input
              type="text"
              value={staffUsername}
              onChange={(e) => setStaffUsername(e.target.value)}
              placeholder="Staff Username"
              required
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
            />
            <input
              type="password"
              value={staffPassword}
              onChange={(e) => setStaffPassword(e.target.value)}
              placeholder="Staff Password"
              required
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
            />
            <input
              type="password"
              value={staffPasswordConfirmation}
              onChange={(e) => setStaffPasswordConfirmation(e.target.value)}
              placeholder="Confirm Password"
              required
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
            />
            <input
              type="text"
              value={staffPhone}
              onChange={(e) => setStaffPhone(e.target.value)}
              placeholder="Staff Phone"
              required
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
            />
            <input
              type="text"
              value={staffRole}
              onChange={(e) => setStaffRole(e.target.value)}
              placeholder="Staff Role Name"
              required
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
            />
            <button
              type="submit"
              className="bg-green-500 text-white rounded-md p-2 w-full hover:bg-green-600 transition"
            >
              Create Staff
            </button>
          </form>
        </>
      )}

      <h2 className="text-xl font-semibold mb-2">Roles List</h2>
      <ul className="border border-gray-200 rounded-md">
        {filteredRoles.map((role) => (
          <li key={role._id} className="flex justify-between items-center p-2 border-b border-gray-200">
            <span>{role.name}</span>
            <div>
              <button
                onClick={() => handleEditRole(role)}
                className="text-blue-500 hover:text-blue-600 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteRole(role._id)}
                className="text-red-500 hover:text-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <ToastContainer />
    </div>
  );
};

export default RoleManage;