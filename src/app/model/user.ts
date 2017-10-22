export class User {
  username: string;
  password: string;
  brithday: Date;
  email: string;
  name: string;
  nickname: string;
  phone: string;
  id: number;
  rememberMe: boolean;

  constructor(username: string,
              password: string,
              rememberMe: boolean,
              brithday?: Date,
              email?: string,
              name?: string,
              nickname?: string,
              phone?: string,
              id?: number) {
    this.username = username;
    this.password = password;
    this.brithday = brithday;
    this.email = email;
    this.name = name;
    this.nickname = nickname;
    this.phone = phone;
    this.id = id;
    this.rememberMe = rememberMe;
  }
}
