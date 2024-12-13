import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RoleManage = () => {
  const [roles, setRoles] = useState([]);
  const [roleName, setRoleName] = useState('');
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('/api/roles');
      setRoles(response.data.data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching roles:', error);
      setError('Failed to fetch roles.'); // Set error message
      setLoading(false); // Ensure loading is set to false even on error
    }
  };

  const handleRoleSubmit = async (e) => {
    e.preventDefault();
    const url = editingRoleId ? `/api/roles/${editingRoleId}` : '/api/roles';
    const method = editingRoleId ? 'PATCH' : 'POST';

    try {
      await axios({ method, url, data: { name: roleName } });
      setRoleName('');
      setEditingRoleId(null);
      fetchRoles(); // Refresh the roles list
    } catch (error) {
      console.error('Error submitting role:', error);
    }
  };

  const handleEdit = (role) => {
    setRoleName(role.name);
    setEditingRoleId(role._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/roles/${id}`);
      fetchRoles(); // Refresh the roles list
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  if (loading) {
    return <div>Loading roles...</div>; // Loading message
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  return (
    <div>
      <h1>Role Management</h1>
      <form onSubmit={handleRoleSubmit}>
        <input
          type="text"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          placeholder="Role Name"
          required
        />
        <button type="submit">
          {editingRoleId ? 'Update Role' : 'Create Role'}
        </button>
      </form>
      <ul>
        {roles.map((role) => (
          <li key={role._id}>
            {role.name}
            <button onClick={() => handleEdit(role)}>Edit</button>
            <button onClick={() => handleDelete(role._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleManage;