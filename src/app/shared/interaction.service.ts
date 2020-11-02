import { Injectable } from '@angular/core';
import { subtract } from 'lodash';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

   _accountNumber = new Subject<number>();
   _id = new Subject<string>();
   _userName: string;
   length: number;

  offersUserId$ = this._id.asObservable();
  headerNumber$ = this._accountNumber.asObservable();
  //userName$ = this._userName.asObservable();
  constructor() { }

  sendAccountsNumber(nb: number){
    this._accountNumber.next(nb);
  }
  sendId(id: string){
    this._id.next(id);
    console.log('sended successfully');
  }
  sendUserName(userName: string){
    // this._userName.next(userName);
    // console.log('user name sended successfully');
    this._userName = userName;
  }
  sendNumber(nb: number){
    this.length = nb;
  }
  getNumber(){
    return this.length;
  }

  getMsg(){
    return this._userName;
  }

}
