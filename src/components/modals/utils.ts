import type { Store } from "antd/lib/form/interface";

export const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

export const tailLayout = {
  wrapperCol: {
    offset: 8,
  },
};

export type ModalProps = {
  onOk: () => void;
  visible: boolean;
  onCancel: () => void;
};

export type FormProps =
  | {
      form: any;
      onFinish: (formValue: Store) => Promise<unknown>;
      initialValues: {};
    }
  | {
      onSubmit(e: any): void;
      form?: undefined;
      onFinish?: undefined;
      initialValues?: undefined;
    };

export interface ModalFormProps {
  modalProps: ModalProps;
  formProps: FormProps;
}
