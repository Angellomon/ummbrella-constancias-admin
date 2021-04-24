import { string, object, TypeOf } from "zod";

export const asistente = object({
  primer_nombre: string(),
  segundo_nombre: string().nullable(),
  apellido_p: string(),
  apellido_m: string(),
  folio: string(),
  correo: string().email(),
});
export type Asistente = TypeOf<typeof asistente>;

export const asistenteCreate = object({
  primer_nombre: string(),
  segundo_nombre: string().optional(),
  apellido_p: string(),
  apellido_m: string(),
  folio: string(),
  correo: string().email(),
});
