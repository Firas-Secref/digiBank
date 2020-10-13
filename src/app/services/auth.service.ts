import { Router } from '@angular/router';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private database: AngularFireDatabase, private router: Router) { }

  offreList: AngularFireList <any> ;


  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOutUser() {
    firebase.auth().signOut();
  }

  // insertUser(user){
  //   this.database.list('/user').push({
  //     email : user.email,
  //     password : user.password,
  //     offre: this.database.list('/user/offre').push({
  //       offreName:''
  //     })
  //   })
  // }
}
