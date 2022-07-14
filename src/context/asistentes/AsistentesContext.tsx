import React, { createContext, FC, PropsWithChildren } from "react";
import useSWR from "swr";
import { useAuth } from "../../hooks/auth";
import { Asistente } from "../../schemas/asistente";
import { API_URL, ASISTENTES_URL } from "../../util/constants";

type AsistentesContextType = {
  asistentes?: Asistente[];
};

interface Props extends PropsWithChildren {}

export const AsistentesContext = createContext<AsistentesContextType>({});

const URL = `${ASISTENTES_URL}`;

const AsistentesProvider: FC<Props> = ({ children }) => {
  const { token } = useAuth();

  const { data: asistentes } = useSWR([URL, token, "asistentes"]);

  return (
    <AsistentesContext.Provider value={{ asistentes }}>
      {children}
    </AsistentesContext.Provider>
  );
};

export default AsistentesProvider;
