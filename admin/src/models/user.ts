export interface UserModel {
  email: string;
  id: number;
  mobile: string;
  name: string;
  username: string;
  allPermission: PermissionModel;
}

export interface PermissionModel {
  [propName: string]: { checked: boolean };
}
