import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import Loading from "../components/Loading/Loading";

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

export const randomAlphaNumeric = (length: number) => {
  let s = "";
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("effect");
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
    } catch (error) {
      alert("An unexpected error occurred");
    }
    setLoading(false);
    alert("User created successfully");
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
