import { RoleEnum } from "@/types/user";
import { SelectOptionInterface } from "./form/SelectField";

export const filterFormId = "filterFormId";

export const createUserFormId = "createUserFormId";

export const convertFirstLetterUpperCase = (str: string): string => {
  return str[0].toUpperCase() + str.substring(1, str.length);
};

export const roleOptions: SelectOptionInterface[] = [
  { label: "Admin", value: RoleEnum.admin },
  { label: "Moderator", value: RoleEnum.moderator },
  { label: "User", value: RoleEnum.user },
];
