import React, { useState, useEffect, PropsWithChildren } from "react";
import jwt_decode from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";

import { isTokenExpired, getToken, removeTokens } from "./utils";
import { Spinner } from "../../components/spinners/Spinner";

import { createContext } from "react";
import type { TokenData } from "../../schemas/oauth";

export interface AuthI {
  isAuthenticated: boolean;
  loading: boolean;
  tokenData: TokenData | null;
  token: string;

  getToken: () => string | null;
  logout: () => void;
  ensureLoggedIn?: () => void;
}

export const AuthContext = createContext<AuthI>({
  isAuthenticated: false,
  loading: false,
  tokenData: null,
  token: "",
  getToken: () => null,
  logout: () => {},
  ensureLoggedIn: () => {},
});

interface Props extends PropsWithChildren {}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const initAuth = async () => {
      try {
        setLoading(true);
        let accessToken = getToken();

        if (!accessToken) {
          setIsAuthenticated(false);
          setTokenData(null);
          removeTokens();
          navigate("/login");
          return;
        }
        setToken(accessToken);

        const isExpired = isTokenExpired(accessToken);
        if (isExpired) {
          setIsAuthenticated(false);
          setTokenData(null);
          removeTokens();
          navigate("/login");
          return;
        }

        const decoded: TokenData | null = jwt_decode(accessToken) as any;

        setTokenData(decoded);
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error);
        setTokenData(null);
        setIsAuthenticated(false);

        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, [history]);

  const logout = () => {
    setTokenData(null);
    removeTokens();
    setIsAuthenticated(false);

    navigate("/login");
  };

  if (location.pathname == "/login") return <>{children}</>;

  if (!isAuthenticated && !token && !loading) {
    navigate("/login");
  }
  if (!token && loading) return <Spinner />;

  return (
    <AuthContext.Provider
      value={{
        getToken,
        isAuthenticated,
        loading,
        logout,
        tokenData,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
