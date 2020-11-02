import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'digiBankproject';
  isAuth= false;
  accountNumber: number;
  id: number;
  photo: string;
  user: User;
  offreNumber: number;
  constructor(private router :Router) {
    const config = {
      apiKey: 'AIzaSyDgEw9JxMUpU-bZkinFuVWowOTYEQ-CFyM',
      authDomain: 'digibank-f11d7.firebaseapp.com',
      databaseURL: 'https://digibank-f11d7.firebaseio.com',
      projectId: 'digibank-f11d7',
      storageBucket: 'digibank-f11d7.appspot.com',
      messagingSenderId: '682551381279',
      appId: '1:682551381279:web:18c4d15c45a8e8fd1e742a'
    };
    firebase.initializeApp(config);


  }
  ngOnInit(): void{
    localStorage.setItem('authentifier', 'non');
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
          localStorage.setItem('authentifier', 'oui' );

        } else {
          this.isAuth = false;
          localStorage.setItem('authentifier', 'non' );
        }
      }
    );
    console.log(this.isAuth);

  }

  onClick(){
    this.router.navigate(['auth/signup']);
  }

}
