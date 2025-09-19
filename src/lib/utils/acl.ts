import {RoleEnum} from "../../types";

export const MemberRoles = [RoleEnum.Member, RoleEnum.Admin];
export const AdminRoles = [RoleEnum.Admin];

export const ACL = {
  categories: {
    create: (role?: string) => !!role && AdminRoles.includes(role as RoleEnum),
    update: (role?: string) => !!role && AdminRoles.includes(role as RoleEnum),
    delete: (role?: string) => !!role && AdminRoles.includes(role as RoleEnum),
  },
  users: {
    view: (role?: string) => !!role && AdminRoles.includes(role as RoleEnum),
    update: (role?: string) => !!role && AdminRoles.includes(role as RoleEnum),
    delete: (role?: string) => !!role && AdminRoles.includes(role as RoleEnum),
  },
};
