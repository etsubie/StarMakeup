import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const RoleManage = () => {
  const [roles, setRoles] = useState([]);
  const [roleName, setRoleName] = useState('');
  const [editingRole, setEditingRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRoleList, setShowRoleList] = useState(true); // Default to show role list

  const apiUrl = 'http://localhost:4200/api/roles';

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
      fetchRoles();
      setEditingRole(null);
    } catch (error) {
      console.error('Error saving role:', error);
      toast.error('Error saving role.');
    } finally {
      setLoading(false);
    }
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

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Role Management</h1>
        {loading && <p className="text-gray-500 text-center">Loading...</p>}

        <h2 className="text-lg font-semibold mb-2">Search Roles</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by role name"
          className="border border-gray-300 rounded-md p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <h2 className="text-lg font-semibold mb-2">Create/Edit Role</h2>
        <form onSubmit={handleCreateOrUpdateRole} className="mb-4">
          <input
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            placeholder="Role Name"
            required
            className="border border-gray-300 rounded-md p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-md px-4 py-1 hover:bg-blue-700 transition duration-200 text-sm shadow-sm mx-2"
          >
            {editingRole ? 'Update Role' : 'Create Role'}
          </button>
        </form>

        <button
          onClick={() => setShowRoleList(!showRoleList)}
          className="bg-gray-600 text-white rounded-md px-4 py-1 mb-4 hover:bg-gray-700 transition duration-200 text-sm shadow-sm mx-2"
        >
          {showRoleList ? 'Hide Roles' : 'Show Roles'}
        </button>

        {showRoleList && (
          <>
            <h2 className="text-lg font-semibold mb-2">Roles List</h2>
            <ul className="border border-gray-200 rounded-md">
              {filteredRoles.map((role) => (
                <li key={role._id} className="flex justify-between items-center p-2 border-b border-gray-200 hover:bg-gray-50 transition duration-200">
                  <span className="text-gray-800">{role.name}</span>
                  <div>
                    <Link
                      to={{
                        pathname: '/manager/EditRole',
                        state: { roleId: role._id },
                      }}
                      className="text-blue-500 hover:text-blue-600 mr-4 text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteRole(role._id)}
                      className="text-red-500 hover:text-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default RoleManage;