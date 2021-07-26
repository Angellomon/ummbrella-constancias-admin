import React, { FC } from "react";
import { Spinner } from "../../components/spinners";
import { TablaAsistentes } from "../../components/tables";
import { useAsistentes } from "../../hooks/asistentes";
import { PageContainer, PageContent, PageHeader } from "../styled";
import Header from "./Header";
import { AsistentesProvider } from "../../context/asistentes";

const AsistentesPage: FC = () => {
  const { asistentes } = useAsistentes();

  if (!asistentes) return <Spinner />;

  return (
    <PageContainer>
      <PageHeader>
        <Header />
      </PageHeader>
      <PageContent>
        <TablaAsistentes />
      </PageContent>
    </PageContainer>
  );
};

export default () => (
  <AsistentesProvider>
    <AsistentesPage />
  </AsistentesProvider>
);
