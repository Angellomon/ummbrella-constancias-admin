import { string, object, TypeOf, number } from "zod";

const eventoBase = object({
  clave: string(),
  nombre: string(),
  inicio_folio: number().default(1),
  total_asistebtes: number().default(0),
  espacios: number().default(4),
  clave_empresa: string().optional().nullable().default(null),
  template: string().default(""),
});

export const evento = eventoBase.extend({});
export type Evento = TypeOf<typeof evento>;
