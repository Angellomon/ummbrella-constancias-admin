import { object, string, nativeEnum, number, TypeOf } from "zod";

export enum Scope {
  CREATE_ASISTENTES = "create:asistentes",
  READ_ASISTENTES = "read:asistentes",
  UPDATE_ASISTENTES = "update:asistentes",
  DELETE_ASISTENTES = "delete:asistentes",

  CREATE_USER = "create:user",
  READ_USERS = "read:users",
  UPDATE_USER = "update:user",
  DELETE_USER = "delete:user",
}

export const scopeEnum = nativeEnum(Scope);

export function checkScopes(scopes: string[], scopesPool: Scope[]) {
  return scopesPool.some((s) => scopes.includes(s));
}

export const token = object({
  access_token: string(),
  token_type: string(),
});
export type Token = TypeOf<typeof token>;

export const tokenData = object({
  sub: string(),
  exp: number(),
  iat: number(),
  scopes: scopeEnum.array(),
});
export type TokenData = TypeOf<typeof tokenData>;
