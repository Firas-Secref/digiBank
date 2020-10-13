import { Offre } from './../models/offre.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AllOffersService } from './../shared/all-offers.service';
import { OffersFormService } from './../shared/offers-form.service';
import { AddOffresDialogComponent } from './../add-offres-dialog/add-offres-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { InteractionService } from '../shared/interaction.service';
import {map} from 'rxjs/operators';
import { User } from '../models/user.model';
import { UserService } from '../shared/user.service';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;


@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css']
})
export class OffresComponent implements OnInit {
  id$: Observable<string>;
  id: string;
  offre: Offre;
  user: User;
  userName: string;
  offresList: any[];
  offres: any;
  offreSubscription: Subscription;




  constructor( private router: Router ,
               private userService: UserService,
               private route: ActivatedRoute,
               public dialog: MatDialog,
               private service: OffersFormService,
               public allOffersService: AllOffersService,
               private interactionService: InteractionService) { }

  ngOnInit(): void {
    //this.offresList = this.allOffersService.offres;
     //this.allOffersService.getOffres();

     this.allOffersService.getAllOffres().subscribe(result => {
      console.log('next', result) ;

      // let arr = [];
      // Object.keys(result).map((key)=>{
      //   arr.push({[key]:result[key]})
      // return arr; });
      // console.log('array', arr);

      console.log('just values offres!', Object.values(result)) ;
      this.offres = Object.values(result) ;
      console.log('000',this.offres);

    })

    //  firebase.database().ref('/offres').on('value', (data: DataSnapshot) => {
    //   this.offres = data.val() ? data.val() : [];
    //   this.allOffersService.emitOffres();
    //   console.log(this.offres);
    // });


    // this.allOffersService.getOffres();
    // console.log('offres',this.allOffersService.offres);
    //this.allOffersService.filterOffres();


    // this.interactionService.userName$.subscribe(
    //   userName => {
    //     this.userName = userName;
    //     console.log('name getted',userName);

    //     //this.userId = userId;
    //   }
    // );

    this.id = this.route.snapshot.paramMap.get('id')
// get the offreName
    console.log('tring',this.id);


    // this.allOffersService.getSingleOffreUser(this.id).then(
    //   (offre: Offre)=>{
    //     this.offre = offre;
    //     console.log(this.offre);

    //   }
    // )

  }
  openDialog(){
    this.allOffersService.getOffres();
    console.log('offres',this.allOffersService.offres);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    this.dialog.open(AddOffresDialogComponent, {
      width: '700px'
    });


  }

  //tab

  tabs = ['First', 'Second', 'Third'];
  // tabs will contain the offer's name
  selected = new FormControl(0);

  addTab() {
    this.tabs.push('New');
    //new well be replaced by offre name
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
    // index will be replaced by
  }
}
