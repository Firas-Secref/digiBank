import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'digiBankproject';
  constructor() {
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
}
