export class Prospect{
  prospectName: string;
  userName: string;
  offreName: string[];
  CIN: string;
  phoneNumber: string;
  birthDate: number;
  constructor(prospectName: string,  CIN: string, phoneNumber: string, birthDate: number,   offreName: string[] ){
    this.prospectName = prospectName;
    this.CIN = CIN;
    this.phoneNumber = phoneNumber;
    this.birthDate = birthDate;
    this.offreName = offreName;
  }
}
