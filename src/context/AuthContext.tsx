import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import Loading from "../components/Loading/Loading";
import axios from "axios";

interface AuthContextType {
  isAuth: boolean;
  handleLogin: (user: object) => Promise<void>;
}

type LoginType = {
  email: string;
  password: string;
  remember_me?: boolean | undefined;
};

interface ProviderProps {
  user: string | null;
  token: string | null;
  handleLogin(data: LoginType): void;
  logout(): void;
  handleRegister(data: LoginType): void;
}

const AuthContext = createContext<ProviderProps>({
  user: null,
  token: "",
  handleLogin: () => {},
  logout: () => {},
  handleRegister: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      api.defaults.headers.common["Authorization"] = token;
      setIsAuth(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = async (userData: LoginType) => {
    try {
      setLoading(true);
      const { data } = await api.post("/login", userData);

      if (!data.activated) {
        alert("Confirm your email first");
        setLoading(false);
        return;
      }

      api.defaults.headers.common["Authorization"] = data.token;

      setUser(userData.email);
      setToken(data.token);
      setIsAuth(true);
      localStorage.setItem("user", JSON.stringify(userData.email));
      localStorage.setItem("token", JSON.stringify(data.token));

      navigate("/dashboard");
    } catch (error) {
      alert("Invalid credentials");
    }
    setLoading(false);
  };

  const handleRegister = async (userData: LoginType) => {
    try {
      setLoading(true);
      await api.post("/user", userData);
      navigate("/");
      alert("User created successfully");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Error creating user";
        alert(errorMessage);
      } else {
        alert("An unexpected error occurred.");
      }
    }
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    setIsAuth(false);
    setToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    navigate("/");
  };

  return loading ? (
    <Loading />
  ) : (
    <AuthContext.Provider
      value={{ user, token, handleLogin, logout, handleRegister }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
