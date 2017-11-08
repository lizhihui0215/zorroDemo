export class Role {
  id: number;
  roleName: string;
  roleSign: string;
  description: string;

  constructor(id?: number, roleName?: string, roleSign?: string, description?: string) {
    this.id = id;
    this.roleName = roleName;
    this.roleSign = roleSign;
    this.description = description;
  }
}
