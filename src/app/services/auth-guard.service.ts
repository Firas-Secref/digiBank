import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import * as firebase from 'firebase';
import { xor } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) { }

  canActivate(): Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if (user) {
              resolve(true);
            } else {
              this.router.navigate(['/auth', 'signin']);
              resolve(false);
            }
          }
        );
      }
    );
  }

  canActivateTo():Observable<boolean>{
    return new Observable((x) =>{
      firebase.auth().onAuthStateChanged(
        (user) =>{
          if (user){

            x.next(true)
          }else
          x.error(false)
          this.router.navigate(['/auth', 'signin']);

        }
      )
    })
  }



}
