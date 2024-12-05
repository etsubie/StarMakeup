import React, { useState, useEffect } from "react";
import axios from "axios";

const RoleManage = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch roles from the backend API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/roles");
        setRoles(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching roles");
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  // Handle creating a new role
  const handleCreateRole = async () => {
    if (!newRole) {
      setError("Role name is required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/roles", { name: newRole });
      setRoles([...roles, response.data.data]);
      setNewRole("");
      setSuccessMessage("Role created successfully");
    } catch (err) {
      setError("Error creating role");
    }
  };

  // Handle deleting a role
  const handleDeleteRole = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/roles/${id}`);
      setRoles(roles.filter(role => role._id !== id));
      setSuccessMessage("Role deleted successfully");
    } catch (err) {
      setError("Error deleting role");
    }
  };

  // Handle updating a role
  const handleUpdateRole = async (id, name) => {
    const updatedName = prompt("Enter new role name:", name);
    if (!updatedName || updatedName === name) return;

    try {
      const response = await axios.put(`http://localhost:5000/api/roles/${id}`, { name: updatedName });
      setRoles(roles.map(role => role._id === id ? response.data.data : role));
      setSuccessMessage("Role updated successfully");
    } catch (err) {
      setError("Error updating role");
    }
  };

  if (loading) return <div>Loading roles...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Role Management</h1>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <div>
        <input
          type="text"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          placeholder="Enter role name"
        />
        <button onClick={handleCreateRole}>Create Role</button>
      </div>
      <h2>Existing Roles</h2>
      <ul>
        {roles.map((role) => (
          <li key={role._id}>
            {role.name}
            <button onClick={() => handleUpdateRole(role._id, role.name)}>Update</button>
            <button onClick={() => handleDeleteRole(role._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleManage;
