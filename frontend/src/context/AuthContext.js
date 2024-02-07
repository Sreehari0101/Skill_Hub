import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const swal = require("sweetalert2");

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const [user, setUser] = useState(
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );
  const [user_type, setUserType] = useState(() => {
    const storedUserType = localStorage.getItem("user_type");
    return storedUserType ? storedUserType : null;
  });
  const [loading, setLoading] = useState(!authTokens); // Initially loading if no authTokens

  const navigate = useNavigate();

  const loginUser = async (email, password) => {
    let url = "http://127.0.0.1:8000/accounts/token/";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      const userData = jwtDecode(data.access);
      console.log(userData);
      const usertype = userData.user_type;
      setUserType(usertype);
      if (usertype === "student") {
        navigate("/student-dashboard");
      } else if (usertype === "mentor") {
        navigate("/mentor-dashboard");
      } else if (usertype === "recruiter") {
        navigate("/recruiter-dashboard");
      } else {
        swal.fire({
          title: "Invalid",
          icon: "error",
          toast: true,
          timer: 3000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }

      swal.fire({
        title: "Login Success",
        icon: "success",
        toast: true,
        timer: 3000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
      console.log(response.status);
      console.log("An Error Occured");
      swal.fire({
        title: "Email - Password does not exist",
        icon: "error",
        toast: true,
        timer: 3000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const registerUser = async (
    full_name,
    email,
    username,
    password,
    password2,
    usertype
  ) => {
    let url = "http://127.0.0.1:8000/accounts/register/";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name,
        email,
        username,
        password,
        password2,
        user_type: usertype,
      }),
    });
    const data = await response.json();

    if (response.status === 201) {
      navigate("/login");
      swal.fire({
        title: "Registration Success, Please Login",
        icon: "success",
        toast: true,
        timer: 2000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else if (password !== password2) {
      swal.fire({
        title: "Passwords does not match",
        icon: "error",
        toast: true,
        timer: 2000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else if (password.length < 8) {
      swal.fire({
        title: "Password is to short - Must be atleast 8 characters",
        icon: "error",
        toast: true,
        timer: 2000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
      console.log(response.status);
      console.log("An Error Occured");
      console.log(data);
      swal.fire({
        title: "There was a server error",
        icon: "error",
        toast: true,
        timer: 2000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/");
    swal.fire({
      title: "You have been logged out",
      icon: "success",
      toast: true,
      timer: 2000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    logoutUser,
    user_type,
    setUserType,
  };

  useEffect(() => {
    const initializeUser = async () => {
      if (authTokens) {
        const decodedToken = jwtDecode(authTokens.access);
        setUser(decodedToken);
        setUserType(decodedToken.user_type);
      }
      setLoading(false);
    };

    initializeUser();
  }, [authTokens]);
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
