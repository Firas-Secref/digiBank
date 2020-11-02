import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [];
  usersLength: number;
  usersSubject = new Subject<User[]>();

  constructor() { }

  emitUsers(){
    this.usersSubject.next(this.users);
  }

  saveUsers(){
    firebase.database().ref('/users').set(this.users);
  }

  addNewUser(newUser: User){
    this.users.push(newUser);
    this.saveUsers();
    this.emitUsers();
  }

  getUsers() {
    firebase.database().ref('/users').on('value', (data: DataSnapshot) => {
      this.users = data.val() ? data.val() : [];
      this.emitUsers();
      this.usersLength = this.users.length;
      console.log('000',this.users);

    });
  }
getUsersLength(){
  return this.usersLength;
}


  getSingleUser(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/users/' +id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  getSingleUserr(id: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/users/' +id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  // getSingleUserr() {
  //   return new Promise(
  //     (resolve, reject) => {
  //       firebase.database().ref('/users/1').once('value').then(
  //         (data: DataSnapshot) => {
  //           resolve(data.val());
  //         }, (error) => {
  //           reject(error);
  //         }
  //       );
  //     }
  //   );
  // }

  removeUser(user: User) {
    if(user.photo) {
      const storageRef = firebase.storage().refFromURL(user.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    }
    const userIndexToRemove = this.users.findIndex(
      (userEl) => {
        if (userEl === user) {
          return true;
        }
      }
    );
    this.users.splice(userIndexToRemove, 1);
    this.saveUsers();
    this.emitUsers();
  }

  getSingleusser() {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/users/0').once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref('/users')
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }
}
