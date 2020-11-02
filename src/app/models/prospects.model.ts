export class Prospect{
  address: string;
  prospectName: string;
  userName: string;
  offreName: string[];
  CIN: string;
  phoneNumber: string;
  birthDate: number;
  photo: string;
  constructor(prospectName: string,  CIN: string, phoneNumber: string, birthDate: number,  offreName: string[], address: string){
    this.prospectName = prospectName;
    this.CIN = CIN;
    this.phoneNumber = phoneNumber;
    this.birthDate = birthDate;
    this.offreName = offreName;
    this.address = address;
  }
}
