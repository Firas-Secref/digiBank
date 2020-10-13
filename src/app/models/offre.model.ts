
export class Offre {
  offreName: string;
  userName: string;
  photo: string;
  categorieName: string;
  description: string;
  constructor(offreName: string, categorieName: string, description: string){
    this.offreName = offreName;
    this.categorieName = categorieName;
    this.description = description;
  }
}
