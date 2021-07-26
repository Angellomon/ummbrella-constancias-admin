import { message } from "antd";
import { Store } from "rc-field-form/lib/interface";
import { useContext, useState } from "react";
import { mutate } from "swr";
import { AsistentesContext } from "../context/asistentes";
import { Asistente, asistente, AsistenteCreate } from "../schemas/asistente";
import { API_URL } from "../util/constants";
import { doDelete, doPatch, doPost } from "../util/fetchers";
import { useAuth } from "./auth";

const URL = `${API_URL}/eventos`;

export const useAsistentes = () => useContext(AsistentesContext);

export const useAsistentesOps = (claveEvento: string) => {
  const { token } = useAuth();
  const [isOperating, setIsOperating] = useState(false);

  const add = async (asistenteData: Store) => {
    try {
      setIsOperating(true);

      const res = await doPost(
        `${URL}/${claveEvento}/asistentes`,
        asistenteData,
        token
      );

      const nuevo = asistente.parse(res);
      await mutate(
        [`${URL}/${claveEvento}/asistentes`, token],
        (asistentes: Asistente[]) => [...asistentes, nuevo]
      );
    } catch (error) {
      message.error("Error al procesar la petición");
      console.log(error);
    } finally {
      setIsOperating(false);
    }
  };

  const addMany = async (
    asistentes: AsistenteCreate[],
    cuentaInicial: number = 0
  ) => {
    try {
      setIsOperating(true);
      const res = await doPost(
        `${URL}/${claveEvento}/asistentes/many`,
        {
          asistentes,
          cuenta_inicial: cuentaInicial,
        },
        token
      );

      const nuevosAsistentes = asistente.array().parse(res);

      await mutate(
        [`${URL}/${claveEvento}/asistentes`, token],
        nuevosAsistentes
      );
    } catch (error) {
      message.error("Error al procesar la peticion");
      console.log(error);
    } finally {
      setIsOperating(false);
    }
  };

  const update = async (folio: string, asistenteData: Store) => {
    try {
      setIsOperating(true);

      const res = await doPatch(
        `${URL}/${claveEvento}/asistentes/${folio}`,
        asistenteData,
        token
      );

      const nuevo = asistente.parse(res);

      await mutate(
        [`${URL}/${claveEvento}/asistentes`, token],
        (asistentes: Asistente[]) => {
          const i = asistentes.findIndex((a) => a.folio === folio);

          const viejo = asistentes.splice(i, 1, nuevo);

          return [...asistentes];
        },
        true
      );
    } catch (error) {
      message.error("Error al procesar la petición");
      console.log(error);
    } finally {
      setIsOperating(false);
    }
  };

  const remove = async (claveAsistente: string) => {
    try {
      setIsOperating(true);

      await doDelete(
        `${URL}/${claveEvento}/asistentes/${claveAsistente}`,
        token
      );
      await mutate(
        [`${URL}/${claveEvento}/asistentes`, token],
        (asistentes: Asistente[]) =>
          asistentes.filter((a) => a.clave !== claveAsistente)
      );
    } catch (error) {
      message.error("Error al procesar la petición");
      console.log(error);
    } finally {
      setIsOperating(false);
    }
  };

  return {
    isOperating,
    update,
    add,
    remove,
    addMany,
  };
};
