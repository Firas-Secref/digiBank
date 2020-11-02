import { Offre } from './../models/offre.model';
import { AllOffersService } from './../shared/all-offers.service';
import { Router } from '@angular/router';
import { User } from './../models/user.model';
import { UserService } from './../shared/user.service';
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
  id: number;
  photo: string;
  user: User;
  offreNumber: number;
  constructor(private router: Router, private authService: AuthService,
              private interactionService: InteractionService,
              private userService: UserService,
              private allOffersService: AllOffersService) { }


  ngOnInit() {

    this.allOffersService.getAllOffres().subscribe(result => {
      console.log('next', result) ;

      // let arr = [];
      // Object.keys(result).map((key)=>{
      //   arr.push({[key]:result[key]})
      // return arr; });
      // console.log('array', arr);
      this.offreNumber = Object.values(result).length;

    })

    this.photo= localStorage.getItem('image');
    this.id= parseInt(localStorage.getItem('userId'));
    console.log(this.photo);

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
    localStorage.removeItem('image');
    localStorage.removeItem('userId');
    

  }
  naviguer(){
    this.router.navigate(['dashboard',this.id]);
  }

}
