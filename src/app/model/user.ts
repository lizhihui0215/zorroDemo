export class User {
  username: string;
  password: string;
  brithday: Date;
  email: string;
  name: string;
  nickname: string;
  phone: string;
  uuid: number;

  constructor(username: string, password: string, brithday: Date, email: string, name: string, nickname: string, phone: string, uuid: number) {
    this.username = username;
    this.password = password;
    this.brithday = brithday;
    this.email = email;
    this.name = name;
    this.nickname = nickname;
    this.phone = phone;
    this.uuid = uuid;
  }
}
