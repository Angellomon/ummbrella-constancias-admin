import { message } from "antd";
import { Store } from "rc-field-form/lib/interface";
import { useContext, useState } from "react";
import { mutate } from "swr";
import { AsistentesContext } from "../context/asistentes";
import { Asistente, asistente, AsistenteCreate } from "../schemas/asistente";
import { API_URL, ASISTENTES_URL } from "../util/constants";
import { doDelete, doPatch, doPost } from "../util/fetchers";
import { useAuth } from "./auth";

const URL = `${ASISTENTES_URL}`;

export const useAsistentes = () => useContext(AsistentesContext);

export const useAsistentesOps = () => {
  const { token } = useAuth();
  const [isOperating, setIsOperating] = useState(false);

  const add = async (asistenteData: Store) => {
    try {
      setIsOperating(true);

      const res = await doPost(URL, asistenteData, token);

      const nuevo = asistente.parse(res);
      await mutate(
        [`${URL}`, token, "asistentes"],
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
        `${URL}/many`,
        {
          asistentes,
          cuenta_inicial: cuentaInicial,
        },
        token
      );

      const nuevosAsistentes = asistente.array().parse(res);

      await mutate([`${URL}`, token, "asistentes"], nuevosAsistentes);
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

      const res = await doPatch(`${URL}/${folio}`, asistenteData, token);

      const nuevo = asistente.parse(res);

      await mutate(
        [`${URL}`, token, "asistentes"],
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

  const remove = async (folio: string) => {
    try {
      setIsOperating(true);

      await doDelete(`${URL}/${folio}`, token);
      await mutate([`${URL}`, token, "asistentes"], (asistentes: Asistente[]) =>
        asistentes.filter((a) => a.folio !== folio)
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
