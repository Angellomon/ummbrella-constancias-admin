import React, { FC } from "react";
import { Breadcrumb, Button, PageHeader, Space } from "antd";
import { ModalFileUpload } from "../../components/modals";
import { useModal, useModalForm } from "sunflower-antd";

interface Props {}

const HeaderAsistentes: FC<Props> = () => {
  const { close, show, visible } = useModal({
    defaultVisible: false,
  });
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
          <Button onClick={show} type="primary" shape="round">
            Cargar CSV
          </Button>
        </Space>
      }
    >
      <ModalFileUpload close={close} visible={visible} />
    </PageHeader>
  );
};

export default HeaderAsistentes;
