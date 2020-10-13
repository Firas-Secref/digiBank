import { Categorie } from './../models/categorie.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as _ from 'lodash';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import { Subject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categories: Categorie[] = [];
  categoriesLength: number;
  categorieSubject = new Subject<Categorie[]>();

  offList: AngularFireList<any>;

  constructor() {

    // this.categorieList = this.fireBase.list('categories');
    // this.categorieList.snapshotChanges().subscribe(
    //   list => {
    //     this.array = list.map(item => {
    //       return {
    //         $key: item.key,
    //         ...item.payload.val()
    //       };
    //     });
    //   });
  }


  // getcategories(){
  //   firebase.database().ref('/offres').on('value', (data: DataSnapshot)=>{
  //     this.categories = data.val() ? data.val() : [];
  //     this.emitCategories();
  //     console.log(this.categories);

  //   })
  // }

  getCat(){

    firebase.database().ref('/categories').on('value', (data: DataSnapshot) => {
      this.categories = data.val() ? data.val() : [];
      this.emitCategories();
      console.log(this.categories);

    })
  }

  getCategories(): Observable<any[]> {
     return new Observable(observer => {
      firebase.database().ref('/categories').on('value', (data: DataSnapshot) => {
        this.categories = data.val() ? data.val() : [];
        this.emitCategories();

       observer.next(this.categories);

        //this.categoriesLength = this.categories.length;
      },
      error => {
        observer.error(error);
      });
     });

  }

  emitCategories(){
    this.categorieSubject.next(this.categories);
  }

  saveCategories(){
    firebase.database().ref('/categories').set(this.categories);
  }

  addNewCategorie(newCat: Categorie){
    this.categories.push(newCat);
    this.saveCategories();
    this.emitCategories();
  }

  // getoffreName(){
  //   firebase.database().ref('offers').once('value').then(
  //     (snapshot) =>{
  //       return snapshot.val().offrTitle ;
  //     }
  //   )
  // }

  // getOffreName(){
  //   return new Promise(
  //     (resolve, reject) => {
  //       firebase.database().ref('offers').once('value').then(
  //         (data: DataSnapshot) =>{
  //           resolve(data.val());
  //         }, (error) =>{
  //           reject (error);
  //         }
  //       );
  //     }
  //   );
  // }

}
