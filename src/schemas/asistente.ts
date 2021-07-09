import { string, object, TypeOf, boolean } from "zod";

export const asistente = object({
  primer_nombre: string(),
  segundo_nombre: string().nullable(),
  apellido_p: string(),
  apellido_m: string(),
  folio: string(),
  correo: string().email(),
  ya_descargo: boolean().default(false),
});
export type Asistente = TypeOf<typeof asistente>;

export const asistenteCreate = object({
  primer_nombre: string(),
  segundo_nombre: string().optional().default(""),
  apellido_p: string().default(""),
  apellido_m: string().default(""),
  folio: string().optional(),
  correo: string().email(),
});
export type AsistenteCreate = TypeOf<typeof asistenteCreate>;
