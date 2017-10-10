export class User {
  username: string;
  password: string;
  age: number;
  brithday: Date;
  email: string;
  name: string;
  nickname: string;
  phone: string;
  uuid: string;

  constructor(username: string, password: string, age: number, brithday: Date, email: string, name: string, nickname: string, phone: string, uuid: string) {
    this.username = username;
    this.password = password;
    this.age = age;
    this.brithday = brithday;
    this.email = email;
    this.name = name;
    this.nickname = nickname;
    this.phone = phone;
    this.uuid = uuid;
  }
}
