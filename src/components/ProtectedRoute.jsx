import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "@/lib/api";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAllowed, setIsAllowed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = localStorage.getItem("isAuthenticated");
      const token = localStorage.getItem("jwt_token");

      if (isAuthenticated !== "true" || !token) {
        navigate("/");
        setChecking(false);
        return;
      }

      try {
        // Verify token with server
        await verifyToken();
        setIsAllowed(true);
      } catch {
        // Token invalid/expired — clear everything and redirect
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userName");
        localStorage.removeItem("userRollNo");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userPhone");
        localStorage.removeItem("jwt_token");
        navigate("/");
      } finally {
        setChecking(false);
      }
    };
    checkAuth();
  }, [navigate]);

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500">Verifying session...</p>
        </div>
      </div>
    );
  }

  if (!isAllowed) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
