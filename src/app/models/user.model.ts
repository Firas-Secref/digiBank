export class User{
  userId: string;
  userName: string;
  prospectName: string[];
  offreName: string[];
  email: string;
  password: string;
  photo: string;
  constructor(email: string,userName: string, password: string ){
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.offreName= [];
    this.prospectName = []
  }
}
