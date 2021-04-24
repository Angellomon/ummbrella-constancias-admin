import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

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

export const AuthProvider: React.FC = ({ children }) => {
  const history = useHistory();
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
          history.push("/login");
          return;
        }
        setToken(accessToken);

        const isExpired = isTokenExpired(accessToken);
        if (isExpired) {
          setIsAuthenticated(false);
          setTokenData(null);
          removeTokens();
          history.push("/login");
          return;
        }

        const decoded: TokenData | null = jwt_decode(accessToken) as any;

        setTokenData(decoded);
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error);
        setTokenData(null);
        setIsAuthenticated(false);

        history.push("/login");
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

    history.push("/login");
  };

  if (!isAuthenticated && !token && !loading) {
    history.push("/login");
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
