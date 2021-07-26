import React, { FC } from "react";
import { Spinner } from "../../../components/spinners";
import { TablaAsistentes } from "../../../components/tables";
import { useEvento } from "../../../hooks/eventos";

const SeccionAsistentes: FC = () => {
  const { asistentes } = useEvento();

  if (typeof asistentes === "undefined") return <Spinner />;

  return (
    <>
      <TablaAsistentes />
    </>
  );
};

export default SeccionAsistentes;
