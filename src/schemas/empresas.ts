import { string, object, TypeOf } from "zod";

const empresaBase = object({
  clave: string(),
  nombre: string(),
  detalles: string().default(""),
});

export const empresa = empresaBase.extend({});

export type Empresa = TypeOf<typeof empresa>;
