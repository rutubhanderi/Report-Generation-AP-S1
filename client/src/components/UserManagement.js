import React, { useState, useEffect } from "react";
import { Eye, UserPlus, Trash2, X } from "lucide-react";
import ViewUserDetails from "./ViewUserDetails";

const UserManagement = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState("admin");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [users, setUsers] = useState({
    admins: [],
    volunteers: [],
  });
  const [newUser, setNewUser] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    role: activeTab === "admin" ? "Admin" : "Volunteer",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users when component mounts or tab changes
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const endpoint =
          activeTab === "admin"
            ? "http://localhost:3001/admin"
            : "http://localhost:3001/admin/volunteerlist";
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const result = await response.json();

        // Map backend data to frontend structure
        const mappedUsers = result.data.map((user) => ({
          id: activeTab === "admin" ? user.admin_id : user.volunteer_id,
          name: activeTab === "admin" ? user.admin_name : user.volunteer_name,
          email:
            activeTab === "admin" ? user.admin_email : user.volunteer_email,
          phone:
            activeTab === "admin" ? user.admin_phone : user.volunteer_phone,
          address:
            activeTab === "admin" ? user.admin_address : user.volunteer_address,
          joinedDate:
            activeTab === "admin" ? user.date_of_joining : user.date_of_joining,
          role: activeTab === "admin" ? "Admin" : "Volunteer",
        }));

        setUsers((prev) => ({
          ...prev,
          [activeTab === "admin" ? "admins" : "volunteers"]: mappedUsers,
        }));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [activeTab]);

  const handleView = (user) => {
    setSelectedUser(user);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    if (!userToDelete) return;

    try {
      const endpoint =
        activeTab === "admin"
          ? "http://localhost:3001/admin"
          : "http://localhost:3001/admin/volunteerlist";
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [activeTab === "admin" ? "admin_id" : "volunteer_id"]:
            userToDelete.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Update local state to remove deleted user
      setUsers((prevUsers) => ({
        ...prevUsers,
        [activeTab === "admin" ? "admins" : "volunteers"]: prevUsers[
          activeTab === "admin" ? "admins" : "volunteers"
        ].filter((user) => user.id !== userToDelete.id),
      }));

      setShowDeleteConfirm(false);
      setUserToDelete(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    try {
      const userPayload = {
        [activeTab === "admin" ? "admin_id" : "volunteer_id"]: parseInt(
          newUser.id
        ),
        [activeTab === "admin" ? "admin_name" : "volunteer_name"]: newUser.name,
        [activeTab === "admin" ? "admin_email" : "volunteer_email"]:
          newUser.email,
        [activeTab === "admin" ? "admin_password" : "volunteer_password"]:
          newUser.password,
        [activeTab === "admin" ? "admin_phone" : "volunteer_phone"]:
          newUser.phone,
        [activeTab === "admin" ? "admin_address" : "volunteer_address"]:
          newUser.address,
        date_of_joining: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };

      const response = await fetch("http://localhost:3001/admin/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userPayload),
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      const result = await response.json();

      // Update local state with new user
      setUsers((prevUsers) => ({
        ...prevUsers,
        [activeTab === "admin" ? "admins" : "volunteers"]: [
          ...prevUsers[activeTab === "admin" ? "admins" : "volunteers"],
          {
            ...newUser,
            id: parseInt(newUser.id),
            joinedDate: userPayload.date_of_joining,
            role: activeTab === "admin" ? "Admin" : "Volunteer",
          },
        ],
      }));

      // Reset form
      setNewUser({
        id:"",
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        role: activeTab === "admin" ? "Admin" : "Volunteer",
      });
      setShowAddForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Render loading state
  if (loading) {
    return (
      <div className="p-6 text-center">
        <p>Loading users...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="p-6 text-red-600">
        <p>Error: {error}</p>
        <button
          onClick={() => {
            setError(null);
            setLoading(true);
          }}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }
  return (
    <div className="p-6">
      {selectedUser ? (
        <ViewUserDetails
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      ) : (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm">
                <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete {userToDelete?.name}? This
                  action cannot be undone.
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {showAddForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    Add New {activeTab === "admin" ? "Admin" : "Volunteer"}
                  </h3>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleAddUser} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ID
                    </label>
                    <input
                      type="number"
                      name="id"
                      required
                      min="1"
                      value={newUser.id}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={newUser.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={newUser.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      required
                      value={newUser.password}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={newUser.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <textarea
                      name="address"
                      required
                      value={newUser.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Add {activeTab === "admin" ? "Admin" : "Volunteer"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Users</h2>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <UserPlus size={18} className="mr-2" />
                Add {activeTab === "admin" ? "Admin" : "Volunteer"}
              </button>
            </div>

            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => setActiveTab("admin")}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "admin"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Admins
              </button>
              <button
                onClick={() => setActiveTab("volunteer")}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "volunteer"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Volunteers
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users[activeTab === "admin" ? "admins" : "volunteers"].map(
                  (user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => handleView(user)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(user)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete User"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
