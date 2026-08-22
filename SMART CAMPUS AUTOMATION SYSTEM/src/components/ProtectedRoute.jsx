import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function decodeToken(token) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

function isTokenExpired(decoded) {
  if (!decoded || !decoded.exp) return true;
  return (decoded.exp * 1000) < (Date.now() + 30000);
}

let lastServerVerify = 0;
const REVERIFY_INTERVAL = 30 * 60 * 1000;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const token = localStorage.getItem("jwt_token");

  if (isAuthenticated !== "true" || !token) {
    navigate("/");
    return null;
  }

  const decoded = decodeToken(token);
  if (!decoded || isTokenExpired(decoded)) {
    clearAuth();
    navigate("/");
    return null;
  }

  const now = Date.now();
  if (now - lastServerVerify > REVERIFY_INTERVAL) {
    lastServerVerify = now;
    import("@/lib/api").then(({ verifyToken }) => {
      verifyToken().catch(() => { clearAuth(); });
    }).catch(() => {});
  }

  return <>{children}</>;
};

function clearAuth() {
  ["isAuthenticated","userRole","userName","userRollNo","userEmail","userPhone","jwt_token"]
    .forEach(k => localStorage.removeItem(k));
}

export default ProtectedRoute;
