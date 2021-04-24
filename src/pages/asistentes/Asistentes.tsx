import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
import React, { FC } from "react";
import { Spinner } from "../../components/spinners";
import { TablaAsistentes } from "../../components/tables";
import { useAsistentes } from "../../hooks/asistentes";
import { PageContainer, PageContent, PageHeader } from "../styled";
import Header from "./Header";

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

export default AsistentesPage;
