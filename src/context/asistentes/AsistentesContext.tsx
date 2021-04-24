import React, { createContext, FC } from "react";
import useSWR from "swr";
import { useAuth } from "../../hooks/auth";
import { Asistente } from "../../schemas/asistente";
import { API_URL } from "../../util/constants";

type AsistentesContextType = {
  asistentes?: Asistente[];
};

export const AsistentesContext = createContext<AsistentesContextType>({});

const URL = `${API_URL}/asistentes`;

const AsistentesProvider: FC = ({ children }) => {
  const { token } = useAuth();

  const { data: asistentes } = useSWR([URL, token, "asistentes"]);
  console.log(URL);

  return (
    <AsistentesContext.Provider value={{ asistentes }}>
      {children}
    </AsistentesContext.Provider>
  );
};

export default AsistentesProvider;
