import { Form, Input, Modal } from "antd";
import React, { FC } from "react";
import { layout, ModalFormProps } from "./utils";

interface Props extends ModalFormProps {
  title?: string;
}

const ModalFormAsistente: FC<Props> = ({
  formProps,
  modalProps,
  title = "Nuevo Asistente",
}) => {
  return (
    <Modal {...modalProps} title={title}>
      <Form {...formProps} {...layout}>
        <Form.Item
          name="primer_nombre"
          label="Primer Nombre"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="segundo_nombre" label="Segundo Nombre">
          <Input />
        </Form.Item>
        <Form.Item
          name="apellido_p"
          label="Apellido Paterno"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="apellido_m"
          label="Apellido Materno"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="correo" label="Correo" rules={[{ required: true }]}>
          <Input type="email" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalFormAsistente;
