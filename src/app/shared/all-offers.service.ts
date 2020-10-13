import { Subject, Observable } from 'rxjs';
import { Offre } from './../models/offre.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class AllOffersService {

  offreList: AngularFireList<any>;
  array = [];
  offres: Offre[] = [];
  x: any[] = [];
  offresSubject = new Subject<Offre[]>();
  constructor() {}

  emitOffres() {
    this.offresSubject.next(this.offres);
  }

  saveOffres() {
    firebase.database().ref('/offres').set(this.offres);
  }

  createNewOffre(newOffre: Offre) {
    console.log('ofrrrrres',typeof this.offres);
    this.offres.push(newOffre);
    this.saveOffres();
    console.log('ofrrrrres',this.offres);

    this.emitOffres();
  }



  getOffres() {
    firebase.database().ref('/offres').on('value', (data: DataSnapshot) => {
     // this.offres = data.val() ? data.val() : [];
      //this.emitOffres();
let array = [] ;
if (data.val()) {
  Object.keys(data.val()).map(personNamedIndex => {
    let offer = data.val()[personNamedIndex];
    array.push(offer);
    console.warn('offer:', offer)
    return array ;
    // do something with person
});
}

    this.offres = array;

this.emitOffres();
    });
 }

 getAllOffres(): Observable<any[]> {
   return new Observable(observer =>{
    firebase.database().ref('/offres').on('value', (data: DataSnapshot) => {
      this.offres = data.val() ? data.val() : [];
      this.emitOffres();
      observer.next(this.offres)
      console.log(this.offres);
      console.log(this.offres.length);
    });

   })

}

 filterOffres(){
   firebase.database().ref('/offres').orderByChild('userName').equalTo('PARTICULIER').on('value', (data: DataSnapshot) => {
    this.x = data.val() ? data.val() : [];
    this.emitOffres();
    console.log('999',this.x);
   })
 }

//  getSingleOffreUser(id: string){
//   return new Promise(
//     (resolve, reject) => {
//       firebase.database().ref('/offres/' + id + '/offreName').once('value').then(
//         (data: DataSnapshot) => {
//           resolve(data.val());
//           console.log(data);
//         }, (error) => {
//           reject(error);
//         }
//       );
//     }
//   );
//  }

}
