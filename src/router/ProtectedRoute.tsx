import React, { useEffect } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../state/store";
import Layout from "../components/layout/Layout";
import { logout } from "../state/slices/authSlice";
import { resetState } from "../state/store";
import { getDecodedToken, isTokenExpired } from "../utils/auth";
import Login from "../pages/Login";

const ProtectedRoute: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const location = useLocation();
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const decoded = getDecodedToken(token);

  useEffect(() => {
    if (!isAuthenticated || isTokenExpired(token)) {
      dispatch(logout());
      dispatch(resetState());
    }
  }, [dispatch, isAuthenticated, token,decoded]);

  // Redirect root path "/" to role-based dashboard
  if (decoded) {
    if (
      location.pathname === "/" ||
      location.pathname === "/home" && decoded?.isSuperAdmin ||
      location.pathname === "/admin" && decoded?.isSuperAdmin === false
    ) {
      return decoded?.isSuperAdmin ? (
        <Navigate to="/admin" replace />
      ) : (
        <Navigate to="/home" replace />
      );
    }
  }


  return isAuthenticated ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Login />
  );
};

export default ProtectedRoute;
