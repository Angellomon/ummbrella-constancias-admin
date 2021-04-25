import {
  Button,
  Divider,
  Input,
  InputNumber,
  Modal,
  Space,
  Table,
  Tooltip,
} from "antd";
import React, { FC, useEffect, useMemo, useState } from "react";
import { ModalProps } from "./utils";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import XLSX from "xlsx";
import { AsistenteCreate, asistenteCreate } from "../../schemas/asistente";
import { CloseOutlined } from "@ant-design/icons";

interface Props extends ModalProps {
  onAsistentesSubmit?: (
    asistentes: AsistenteCreate[],
    cuentaInicial?: number
  ) => void | Promise<void>;
}

const { Column } = Table;

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const FileUploadForm: FC<Props> = ({
  onAsistentesSubmit = () => {},
  ...modalProps
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [cuentaInicial, setCuentaInicial] = useState(0);
  const [asistentes, setAsistentes] = useState<AsistenteCreate[]>([]);

  const [binatryStr, setBinaryStr] = useState<string>();
  const [arr, setArr] = useState<Uint8Array>();

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) => {
          const fileReader = new FileReader();

          fileReader.onload = function () {
            let arrayBuffer = this.result;
            let array = new Uint8Array(arrayBuffer as any);
            setArr(array);
            setBinaryStr(String.fromCharCode.apply(null, array as any));
          };

          fileReader.readAsArrayBuffer(file);
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        })
      );
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  useEffect(() => {
    if (!binatryStr) return;

    const workbook = XLSX.read(arr, { type: "array" });

    workbook.SheetNames.forEach((sheet) => {
      const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
      let r = [];
      for (let row of rows) {
        console.log(row);

        r.push(asistenteCreate.parse(row));
      }
      setAsistentes(r);
    });
  }, [binatryStr]);

  const handleFileRemove = () => {
    setArr(undefined);
    setBinaryStr(undefined);
    setAsistentes([]);
    setFiles([]);
  };

  const handleOk = () => {
    onAsistentesSubmit(asistentes, cuentaInicial);
    modalProps.close && modalProps.close();
  };

  return (
    <Modal
      title="Subir Base de Datos"
      onCancel={modalProps.close}
      width="70%"
      onOk={handleOk}
      {...modalProps}
    >
      <div {...getRootProps({ style: style as any })}>
        <input {...getInputProps()} />
        <strong>Drag 'n' drop or select file</strong>
        <aside>
          <ul>
            {files.map((file) => (
              <li key={(file as any).path}>
                {(file as any).path} - {file.size} bytes
              </li>
            ))}
          </ul>
        </aside>
      </div>
      <Space>
        <Button
          onClick={handleFileRemove}
          style={{ marginTop: 15 }}
          icon={<CloseOutlined />}
          danger
        >
          Quitar Archivo
        </Button>
        <Tooltip title="Cuenta inicial">
          <InputNumber
            onChange={(value) => setCuentaInicial(value)}
            value={cuentaInicial}
            placeholder="Cuenta inicial"
            defaultValue={0}
          />
        </Tooltip>
      </Space>
      <Divider orientation="left">Vista Previa</Divider>
      {asistentes && (
        <Table dataSource={asistentes}>
          <Column dataIndex="primer_nombre" title="Primer Nombre" />
          <Column dataIndex="segundo_nombre" title="Segundo Nombre" />
          <Column dataIndex="apellido_p" title="Apellido Paterno" />
          <Column dataIndex="apellido_m" title="Apellido Materno" />
          <Column dataIndex="correo" title="Correo" />
        </Table>
      )}
    </Modal>
  );
};

export default FileUploadForm;
