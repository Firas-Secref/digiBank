import { InteractionService } from './../shared/interaction.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;
  accountNumber: number;
  constructor(private authService: AuthService, private interactionService: InteractionService) { }


  ngOnInit() {

    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
    this.interactionService.headerNumber$.subscribe(
      accountNb =>{
        console.log('number', accountNb);
        this.accountNumber = accountNb;
      }
    );

  }

  onSignOut() {
    this.authService.signOutUser();
    localStorage.removeItem('userName');
  }

}
