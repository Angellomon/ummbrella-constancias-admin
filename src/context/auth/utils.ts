import { message } from "antd";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { stringify } from "querystring";

import { API_URL } from "../../util/constants";
import { token as tokenSchema, TokenData } from "../../schemas/oauth";

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

export type UserClaimsSchema = {
  role: string;
  departamentos: string[];
  clave: string;
};

export const getToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN);
};
export const setToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN, token);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN);
};

export const isTokenExpired = (token: string) => {
  const decodedToken: TokenData | null = jwt_decode(token) as any;
  if (!decodedToken) return true;

  const now = Date.now() / 1000;

  if (decodedToken.exp < now) {
    return true;
  }
  return false;
};

export const refresh = async () => {
  try {
    // const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    // const res = await axios.post(
    //   `${API_URL}/refresh`,
    //   {
    //     refresh_token: refreshToken,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${refreshToken}`,
    //     },
    //   }
    // );
    // const accessToken = res.data.access_token;
    // localStorage.setItem(ACCESS_TOKEN, accessToken);
  } catch (error) {
    console.log(error.request.response);
  }
};

export const ensureLoggedIn = () => {
  const token = getToken();
  if (!token) return;

  const expired = isTokenExpired(token);

  if (expired) {
    refresh();
  }
};

export const removeTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

export const login = async (username: string, password: string) => {
  let success = false;
  try {
    const res = await axios.post(
      `${API_URL}/oauth/token`,
      stringify({
        grant_type: "password",
        username,
        password,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    if (res.status !== 200) {
      message.error(`Credenciales Inválidas`);
      console.error(
        `error en autenticación (status=${res.status}, data=${res.data})`
      );
      return false;
    }

    const data = tokenSchema.parse(res.data);

    const decoded: TokenData | null = jwt_decode(data.access_token) as any;

    if (!decoded) {
      message.error("Error al hacer login");
      console.error(`error al procesar token (data=${res.data})`);
      return false;
    }

    setToken(data.access_token);

    success = true;
  } catch (error) {
    console.log(typeof error);

    message.error("Nombre de usuario y/o contraseña incorrectos");
    console.log(error);
    success = false;
  } finally {
    return success;
  }
};
