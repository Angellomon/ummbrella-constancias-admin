import useSWR, { mutate } from "swr";
import { API_URL, CLAVE_EMPRESA } from "../util/constants";
import { Evento } from "../schemas/eventos";
import { Store } from "antd/lib/form/interface";
import { useContext, useState } from "react";
import { doPost } from "../util/fetchers";
import { useAuth } from "./auth";
import { EventoContext } from "../context/eventos/EventoContext";

const URL = `${API_URL}/empresas/${CLAVE_EMPRESA}`;

export const useEvento = () => useContext(EventoContext);

export const useEventos = () => {
  const { token } = useAuth();
  const { data: eventos } = useSWR<Evento[]>([`${URL}/eventos`, token]);

  return {
    eventos,
  };
};

export const useEventosOps = () => {
  const [isOperating, setIsOperating] = useState(false);
  const { token } = useAuth();

  const add = async (data: Store) => {
    try {
      setIsOperating(true);

      const res = await doPost(`${URL}/eventos`, data, token);

      await mutate(`${URL}/eventos`, (eventos: Evento[]) => [...eventos, res]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsOperating(false);
    }
  };

  return {
    add,
    isOperating,
  };
};
