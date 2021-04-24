import { notification } from "antd";
import axios from "axios";
import { ZodError } from "zod";

import { getToken } from "../context/auth";

import { asistente } from "../schemas/asistente";
export type Schemas = "asistente";

const schemasMap = {
  asistente,
  asistentes: asistente.array(),
};

export class FetchError extends Error {
  status?: number | string;
  detail?: string;
  data?: any;

  constructor(
    message: string,
    status?: number | string,
    detail?: string,
    data?: any
  ) {
    super(message);
    this.status = status;
    this.detail = detail;
    this.data = data;
  }
}

export const doGet = async (
  url: string,
  accessToken: string,
  schema?: Schemas
) => {
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (schema) {
      const t0 = performance.now();
      const result = schemasMap[schema].parse(res.data);
      const t1 = performance.now();
      console.log(`tiempo de ejecución de validación (${schema}): ${t1 - t0}`);
      return result;
    }
    return res.data;
  } catch (error) {
    console.log(schema, error);
    if (axios.isAxiosError(error)) {
      console.log(error.response?.status, error.response?.statusText);

      throw new FetchError(
        "fetch error",
        error.response?.status,
        error.response?.statusText
      );
    } else if (error instanceof ZodError) {
      console.log(schema, error.errors);
      throw new FetchError(
        "validation error",
        error.message,
        "validation_error",
        error.errors
      );
    }
  }
};

export const doPost = async (url: string, data: any, accessToken: string) => {
  try {
    const res = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new FetchError(
      "post error",
      error.response.status,
      error.response.data.detail
    );
  }
};

export const doPatch = async (url: string, data: any, accessToken: string) => {
  try {
    const res = await axios.patch(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new FetchError(
      "patch error",
      error.response.status,
      error.response.data.detail
    );
  }
};

export const doDelete = async (url: string, accessToken: string) => {
  try {
    const res = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new FetchError(
      "delete error",
      error.response.status,
      error.response.data.detail
    );
  }
};

export const getBytesArray = async (...args: any[]) => {
  try {
    const res = await axios.get(args[0], {
      headers: {
        Authorization: `Bearer ${args[1]}`,
      },
      responseType: "arraybuffer",
    });
    return res.data;
  } catch (error) {
    notification.error({
      message: "Error en servidor",
      description: `Reportar a sistemas de error [url=${args[0]}, method=GET]`,
    });
    console.log(error?.request?.response);
    return null;
  }
};

export const postBytesArray = async (...args: any[]) => {
  try {
    const res = await axios.post(args[0], args[1], {
      headers: {
        Authorization: `Bearer ${args[2]}`,
      },
      responseType: "arraybuffer",
    });
    return res.data;
  } catch (error) {
    notification.error({
      message: "Error en servidor",
      description: `Reportar a sistemas de error [url=${args[0]}, method=POST]`,
    });
    console.log(error);
    console.log(error?.request?.response);
    return null;
  }
};
