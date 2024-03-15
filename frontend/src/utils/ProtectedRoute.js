import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children, allowedRoles }) {
  const { user_type, loading } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const [contextLoaded, setContextLoaded] = useState(false);

  useEffect(() => {
    setContextLoaded(true);
  }, [loading]);

  if (!contextLoaded) {
    return null;
  }

  if (!user_type || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user_type)) {
    return <Navigate to="/unauthorized" replace />;
  }
  console.log(user)
  return children;
}

export default PrivateRoute;