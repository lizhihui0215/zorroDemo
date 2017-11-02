export class Role {
  id: string;
  roleName: string;
  roleSign: string;
  description: string;

  constructor(id: string, roleName: string, roleSign: string, description: string) {
    this.id = id;
    this.roleName = roleName;
    this.roleSign = roleSign;
    this.description = description;
  }
}
