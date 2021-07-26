import { PlusOutlined } from "@ant-design/icons";
import { Button, PageHeader, Space, Tabs } from "antd";
import React, { FC } from "react";
import { useModal } from "sunflower-antd";
import { ModalFileUpload } from "../../components/modals";
import { useAsistentesOps } from "../../hooks/asistentes";
import { useEvento } from "../../hooks/eventos";
import { AsistenteCreate } from "../../schemas/asistente";

const HeaderEvento: FC = () => {
  const { evento, claveEvento, seccion } = useEvento();

  const { close, show, visible } = useModal({
    defaultVisible: false,
  });

  const { addMany, isOperating } = useAsistentesOps(claveEvento);

  const handleAsistentesUpload = async (
    asistentes: AsistenteCreate[],
    cuentaInicial: number = 0
  ) => {
    await addMany(asistentes, cuentaInicial);
  };

  return (
    <PageHeader
      breadcrumb={{
        routes: [
          {
            path: "/",
            breadcrumbName: "Eventos",
          },
          {
            breadcrumbName: evento?.nombre || "...",
            path: `/eventos/${claveEvento}`,
          },
        ],
      }}
      footer={
        <Tabs defaultActiveKey={seccion}>
          <Tabs.TabPane tab="Aistentes" key="asistentes" />
          <Tabs.TabPane tab="Eventos" key="eventos" />
        </Tabs>
      }
      extra={
        <Space>
          <Button
            loading={isOperating}
            onClick={show}
            type="primary"
            shape="round"
            icon={<PlusOutlined />}
          >
            Cargar Excel
          </Button>
        </Space>
      }
    >
      <ModalFileUpload
        onAsistentesSubmit={handleAsistentesUpload}
        close={close}
        visible={visible}
      />
    </PageHeader>
  );
};

export default HeaderEvento;
