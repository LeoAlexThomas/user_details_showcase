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

export const getIsUserRolePresent = (role: string): boolean =>
  role === RoleEnum.admin ||
  role === RoleEnum.moderator ||
  role === RoleEnum.user;

export const getUserRole = (role: string): RoleEnum | null => {
  switch (role) {
    case RoleEnum.admin:
      return RoleEnum.admin;
    case RoleEnum.moderator:
      return RoleEnum.moderator;
    case RoleEnum.user:
      return RoleEnum.user;
    default:
      return null;
  }
};
