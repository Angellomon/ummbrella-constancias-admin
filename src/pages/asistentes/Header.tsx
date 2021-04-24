import React, { FC } from "react";
import { Breadcrumb, Button, PageHeader, Space } from "antd";

interface Props {}

const HeaderAsistentes: FC<Props> = () => {
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
          <Button type="primary" shape="round">
            Cargar CSV
          </Button>
        </Space>
      }
    ></PageHeader>
  );
};

export default HeaderAsistentes;
