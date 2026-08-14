import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function AdminRoute({
  children,
}) {

  const {
    user,
    profile,
    loading,
  } = useAuth();

  if (loading) {

    return (

      <div className="flex h-screen items-center justify-center">

        Cargando...

      </div>

    );

  }

  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }

  if (profile?.role !== "admin") {

    return (
      <Navigate
        to="/"
        replace
      />
    );

  }

  return children;

}