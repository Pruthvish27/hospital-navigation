import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AdminPage = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", role: "Admin" },
    { id: 2, name: "Jane Smith", role: "Editor" },
    { id: 3, name: "Emily Davis", role: "Viewer" },
  ]);

  const [logs] = useState([
    { id: 1, action: "User login", timestamp: "2023-10-01 10:00 AM" },
    { id: 2, action: "User logout", timestamp: "2023-10-01 10:30 AM" },
    { id: 3, action: "Profile updated", timestamp: "2023-10-01 11:00 AM" },
  ]);

  const deleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-[#f8f8f8] to-[#e0f8e0] p-8"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-[#2E8B57]">Admin Dashboard</h1>
        <Button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-[#2E8B57] text-white text-lg font-bold rounded-lg shadow-md hover:bg-[#3CB371] hover:scale-105 transition-all duration-300"
        >
          Back to Home
        </Button>
      </div>

      {/* User Management Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#2E8B57] mb-4">User Management</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <table className="w-full">
            <thead>
              <tr className="bg-[#2E8B57] text-white">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="px-4 py-2 text-center">{user.id}</td>
                  <td className="px-4 py-2 text-center">{user.name}</td>
                  <td className="px-4 py-2 text-center">{user.role}</td>
                  <td className="px-4 py-2 text-center">
                    <Button
                      onClick={() => deleteUser(user.id)}
                      className="px-4 py-2 bg-red-500 text-white text-sm font-bold rounded-lg shadow-md hover:bg-red-600 hover:scale-105 transition-all duration-300"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Logs Section */}
      <div>
        <h2 className="text-2xl font-bold text-[#2E8B57] mb-4">System Logs</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <table className="w-full">
            <thead>
              <tr className="bg-[#2E8B57] text-white">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Action</th>
                <th className="px-4 py-2">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b">
                  <td className="px-4 py-2 text-center">{log.id}</td>
                  <td className="px-4 py-2 text-center">{log.action}</td>
                  <td className="px-4 py-2 text-center">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminPage;