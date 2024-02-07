import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children, allowedRoles }) {
  const { user_type, loading } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const [contextLoaded, setContextLoaded] = useState(false);

  useEffect(() => {
    // Wait until context has finished loading
    setContextLoaded(true);
  }, [loading]);

  if (!contextLoaded) {
    // Wait until context has finished loading
    return null;
  }

  if (!user_type || !user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Check if user_type is allowed access based on `allowedRoles` prop
  if (allowedRoles && !allowedRoles.includes(user_type)) {
    // Redirect to unauthorized page if not allowed
    return <Navigate to="/unauthorized" replace />;
  }

  // Render protected route if authenticated and authorized
  return children;
}

export default PrivateRoute;