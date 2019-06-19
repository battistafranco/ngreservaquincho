import { User } from "../../models/user";
export interface Auth {
  isAuthenticated: boolean;
  user: User;
  formStatus: string;
  formType: string;
}
