import { Vault } from "./vault";

type Password = {
  id: number;
  name: string;
  vault_id: Vault['id'];
  password: string;
  comment: string;
  url: string;
  created_at: string;
  updated_at: string;
};

type SharedPassword = {
  name: string;
  password: string;
  url_id: string;
  usages: number;
  timelimit: string;
  active: boolean;
};

type PasswordHistory = {
  password: Password;
  operation: "MODIFY" | "DELETE";
  at: string;
};

export type { Password, SharedPassword, PasswordHistory };
