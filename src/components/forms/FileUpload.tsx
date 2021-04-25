import { InboxOutlined } from "@ant-design/icons";
import { Form, Upload } from "antd";
import React, { FC } from "react";

interface Props {}

const normFile = (e: any) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const FileUploadForm: FC = ({}) => {
  return (
    <Form wrapperCol={{ span: 10 }} labelCol={{ span: 8 }}>
      <Form.Item label="Dragger">
        <Form.Item
          name="dragger"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          noStyle
        >
          <Upload.Dragger name="files" action="/upload.do">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload.
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>
    </Form>
  );
};

export default FileUploadForm;
