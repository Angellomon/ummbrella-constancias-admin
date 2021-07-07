import useSWR from "swr";
import type { Empresa } from "../schemas/empresas";
import { API_URL } from "../util/constants";
import { useAuth } from "./auth";

const URL = `${API_URL}/empresas`;

export const useEmpresas = () => {
  const { token } = useAuth();

  const { data: empresas } = useSWR<Empresa[]>([URL, token]);

  return {
    empresas,
  };
};
