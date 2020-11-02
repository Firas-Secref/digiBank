import { Prospect } from './../models/prospects.model';
import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;


@Injectable({
  providedIn: 'root'
})
export class ProspectService {
  prospects: Prospect[] = [];
  prospect: Prospect;
  prospectsLength: number;
  prospectsSubject = new Subject<Prospect[]>();

  constructor() { }

  emitProspects(){

    this.prospectsSubject.next(this.prospects);
  }

  saveProspects(){
    //console.log('prospects', prospect);
    firebase.database().ref('/prospects').set(this.prospects);
  }

  addNewProspect(newProspect: Prospect){
    this.prospects.push(newProspect);
    this.saveProspects();
    this.emitProspects();
  }


  filterProspects(userName: string){
    firebase.database().ref('/prospects').orderByChild('userName').equalTo(userName).on('value', (data: DataSnapshot) => {
     this.prospects = data.val() ? data.val() : [];
     this.emitProspects();
     console.log('prospects',this.prospects);
    })
  }

  getProspects(){
    firebase.database().ref('/prospects').on('value', (data: DataSnapshot) => {
      this.prospects = data.val() ? data.val() : [];
      this.emitProspects();
      this.prospectsLength = this.prospects.length;
    })

  }

  gettest() : Observable<any> {
    return new Observable((observer)=> {

      observer.next(true);
      observer.error('empty array');
      observer.next(100)
      observer.complete()
    }) ;
    //of(true)
  }
  listenToGetTest() {
    this.gettest().subscribe(result => {
      console.log(result) ; // true 100
    },
      (error) => {console.log(error);} // false
    )
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref('/prospects')
          .child('photo/' + almostUniqueFileName + file.name).put(file);
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

  getSingleProspect(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/prospects/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  removeProspect(prospect: Prospect) {
    if(prospect.photo) {
      const storageRef = firebase.storage().refFromURL(prospect.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    }
    const prospectIndexToRemove = this.prospects.findIndex(
      (prospectEl) => {
        if(prospectEl === prospect) {
          return true;
        }
      }
    );
    this.prospects.splice(prospectIndexToRemove, 1);
    this.saveProspects();
    this.emitProspects();
}
}
