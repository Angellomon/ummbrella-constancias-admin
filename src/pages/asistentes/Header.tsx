import React, { FC } from "react";
import { Breadcrumb, Button, PageHeader, Space } from "antd";
import { ModalFileUpload } from "../../components/modals";
import { useModal } from "sunflower-antd";
import { AsistenteCreate } from "../../schemas/asistente";
import { useAsistentesOps } from "../../hooks/asistentes";
import { PlusOutlined } from "@ant-design/icons";

interface Props {}

const HeaderAsistentes: FC<Props> = () => {
  const { close, show, visible } = useModal({
    defaultVisible: false,
  });

  const { addMany, isOperating } = useAsistentesOps();

  const handleAsistentesUpload = async (
    asistentes: AsistenteCreate[],
    cuentaInicial: number = 0
  ) => {
    await addMany(asistentes, cuentaInicial);
  };

  return (
    <PageHeader
      title="Lista de Asistentes"
      breadcrumbRender={() => (
        <Breadcrumb>
          <Breadcrumb.Item>Asistentes</Breadcrumb.Item>
        </Breadcrumb>
      )}
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

export default HeaderAsistentes;
