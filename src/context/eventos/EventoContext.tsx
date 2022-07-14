import React, { createContext, PropsWithChildren, useState } from "react";
import type { FC } from "react";
import { useParams } from "react-router";
import useSWR from "swr";
import { useAuth } from "../../hooks/auth";
import { Asistente } from "../../schemas/asistente";
import { Evento } from "../../schemas/eventos";
import { API_URL } from "../../util/constants";

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

interface Props extends PropsWithChildren {}

const EventoProvider: FC<Props> = ({ children }) => {
  const { claveEvento = "" } = useParams();
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
