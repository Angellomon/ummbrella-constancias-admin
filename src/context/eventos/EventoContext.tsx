import React, { createContext, FC, useState } from "react";
import { useParams, useLocation } from "react-router";
import useSWR from "swr";
import { useAuth } from "../../hooks/auth";
import { Asistente } from "../../schemas/asistente";
import { Evento } from "../../schemas/eventos";
import { API_URL, CLAVE_EMPRESA } from "../../util/constants";

type EventoContextoType = {
  evento?: Evento;
  claveEvento: string;
  seccion: string;
  setSeccion: (seccion: string) => void;
  asistentes?: Asistente[];
};

export const EventoContext = createContext<EventoContextoType>({
  claveEvento: "",
  seccion: "asistentes",
  setSeccion: () => {},
});

const URL = `${API_URL}/eventos`;

interface Props {
  claveEvento: string;
}

const EventoProvider: FC<Props> = ({ claveEvento, children }) => {
  const { token } = useAuth();
  const { data: evento } = useSWR<Evento>([`${URL}/${claveEvento}`, token]);
  const { data: asistentes } = useSWR<Asistente[]>([
    `${URL}/${claveEvento}/asistentes`,
    token,
  ]);
  const [seccion, setSeccion] = useState("asistentes");

  return (
    <EventoContext.Provider
      value={{
        evento,
        claveEvento,
        seccion,
        setSeccion,
        asistentes,
      }}
    >
      {children}
    </EventoContext.Provider>
  );
};

export default EventoProvider;
