import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/admin/login");
    }
  }, [router, user]);

  return <>{user ? children : null}</>;
}
