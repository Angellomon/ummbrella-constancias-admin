import React, { FC, useState } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  Popconfirm,
  Space,
  Table,
  Tooltip,
} from "antd";
import { useAsistentes, useAsistentesOps } from "../../hooks/asistentes";
import {
  DeleteOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ModalFormAsistente } from "../modals";
import { useModalForm, useFormTable } from "sunflower-antd";
import { Asistente } from "../../schemas/asistente";
import { Store } from "rc-field-form/lib/interface";
import { Spinner } from "../spinners";

const { Column } = Table;

const { useForm } = Form;

const TablaAsistentes: FC = () => {
  const [editingFolio, setEditingFolio] = useState<string>();
  const [folio, setFolio] = useState<string>();
  const [correo, setCorreo] = useState<string>();
  const { asistentes } = useAsistentes();
  const { update, add, remove } = useAsistentesOps();

  const [form] = useForm();

  const {
    show: showModalAsistente,
    formProps: formPropsAsistente,
    modalProps: modalPropsAsistente,
    form: formAsistente,
  } = useModalForm({
    submit: async (values) => {
      if (!editingFolio) return;
      await update(editingFolio, values);
      setEditingFolio(undefined);
    },
    defaultVisible: false,
    autoResetForm: true,
  });

  const {
    show: showAddAsistente,
    formProps: formPropsAddAsistente,
    modalProps: modalPropsAddAsistente,
  } = useModalForm({
    submit: add,
    defaultVisible: false,
    autoResetForm: true,
  });

  const handleAsistenteEdit = (folio: string) => {
    if (!asistentes) return;
    setEditingFolio(folio);
    const asistente = asistentes.find((a) => a.folio === folio);

    formAsistente.setFieldsValue(asistente);
    showModalAsistente();
  };

  const handleSearchFinish = (values: Store) => {
    setCorreo(values.correo);
    setFolio(values.folio);
  };

  if (!asistentes) return <Spinner />;

  return (
    <>
      <Button
        block
        type="dashed"
        onClick={showAddAsistente}
        icon={<PlusOutlined />}
      >
        Agregar Asistente
      </Button>
      <Divider />
      <Form onFinish={handleSearchFinish} layout="inline" form={form}>
        <Form.Item label="Folio" name="folio">
          <Input placeholder="Folio" />
        </Form.Item>
        <Form.Item label="Correo" name="correo">
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item>
          <Button
            onClick={() => {
              form.resetFields();
              setCorreo(undefined);
              setFolio(undefined);
            }}
            shape="round"
            icon={<ReloadOutlined />}
          >
            Reset
          </Button>
        </Form.Item>

        <Form.Item>
          <Button
            icon={<SearchOutlined />}
            shape="round"
            type="primary"
            htmlType="submit"
          >
            Buscar
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      <Table
        dataSource={
          !folio && !correo
            ? asistentes
            : folio && !correo
            ? asistentes.filter((a) => a.folio === folio)
            : !folio && correo
            ? asistentes.filter((a) => a.correo === correo)
            : asistentes.filter((a) => a.folio === folio && a.correo === correo)
        }
        rowKey={(record) => record.folio}
      >
        <Column dataIndex="folio" title="Folio" key="folio" />
        <Column
          dataIndex="primer_nombre"
          title="Primer Nombre"
          key="primer_nombre"
        />
        <Column
          dataIndex="segundo_nombre"
          title="Segundo Nombre"
          key="segundo_nombre"
        />
        <Column
          dataIndex="apellido_p"
          title="Apellido Paterno"
          key="apellido_p"
        />
        <Column
          dataIndex="apellido_m"
          title="Apellido Materno"
          key="apellido_m"
        />
        <Column dataIndex="correo" title="Correo" key="correo" />
        <Column
          title="Operación"
          render={(_, record: Asistente) => (
            <Space>
              <Button
                type="link"
                onClick={() => handleAsistenteEdit(record.folio)}
              >
                Editar
              </Button>
              <Popconfirm
                title="Confirmar eliminación"
                onConfirm={() => remove(record.folio)}
              >
                <DeleteOutlined style={{ color: "#e0284a" }} />
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
      <ModalFormAsistente
        modalProps={modalPropsAsistente}
        formProps={formPropsAsistente}
        title="Editar Asistente"
      />
      <ModalFormAsistente
        modalProps={modalPropsAddAsistente}
        formProps={formPropsAddAsistente}
        title="Nuevo Asistente"
      />
    </>
  );
};

export default TablaAsistentes;
