import React, { FC } from "react";
import { useEvento } from "../../hooks/eventos";
import { PageContainer, PageContent, PageHeader } from "../styled";
import HeaderEvento from "./Header";
import { SeccionAsistentes } from "./secciones";

const PageEvento: FC = () => {
  const { claveEvento } = useEvento();
  return (
    <PageContainer>
      <PageHeader>
        <HeaderEvento />
      </PageHeader>

      <PageContent>
        <SeccionAsistentes />
      </PageContent>
    </PageContainer>
  );
};

export default PageEvento;
