import { User } from "../../../models/user";
export interface UsersPage {
  loading: boolean;
  users: User[];
  formStatus: string;
}
