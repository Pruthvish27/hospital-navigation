
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const AdminLogin = ({ setIsAuthenticated }) => { // Accept setIsAuthenticated as a prop
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "root" && password === "rootmywill") {
      setIsAuthenticated(true); // Set authentication state to true
      navigate("/admin"); // Redirect to the admin page
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#f8f8f8] to-[#e0f8e0]"
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-[#2E8B57] mb-6">Admin Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 w-full border rounded-lg"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded-lg"
          />
        </div>
        <Button
          onClick={handleLogin}
          className="w-full px-6 py-3 bg-[#2E8B57] text-white text-lg font-bold rounded-lg shadow-md hover:bg-[#3CB371] hover:scale-105 transition-all duration-300"
        >
          Login
        </Button>
      </div>
    </motion.div>
  );
};

export default AdminLogin;
