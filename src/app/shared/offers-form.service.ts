import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;


@Injectable({
  providedIn: 'root'
})
export class OffersFormService {

  constructor(private fireBase: AngularFireDatabase) { }
  offreList: AngularFireList<any>;

  // addOffForm: FormGroup = new FormGroup({
  //   offreTitle: new FormControl('', Validators.required),
  //   categorie: new FormControl('', Validators.required),
  //   description: new FormControl('', Validators.required),
  // });

  // initializeFormGroup(){
  //   this.addOffForm.setValue({
  //     offreTitle: '',
  //     categorie: '',
  //     description: ''
  //   });
  // }



  getOffers(){
    this.offreList = this.fireBase.list('offers');
    console.log('offers', this.offreList);
    return this.offreList.snapshotChanges();
  }

  getSingleOffre(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/offres/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  // addOffre(offre): void{
  //   this.offreList.push({
  //     offreTitle: offre.offreTitle,
  //     categorie: offre.categorie,
  //     description: offre.description
  //   });
  // }

  // updateOffre(offre){
  //   this.offreList.update(offre.$key,{
  //     offreTitle: offre.offreTitle,
  //     categorie: offre.categorie,
  //     description: offre.description
  //   });
  // }

  // deleteOffre($key: string): void{
  //   this.offreList.remove($key);
  // }
}
