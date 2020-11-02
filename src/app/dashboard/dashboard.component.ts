import { UserService } from './../shared/user.service';
import { User } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import { InteractionService } from '../shared/interaction.service';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  id$: Observable<string>;
  id: string;
  constructor(private route: ActivatedRoute, private interactionService: InteractionService, private router: Router) {


  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('tring', this.id);
    this.interactionService.sendId(this.id);

  }

  onClick(){
    this.router.navigate(['dashboard/userId/' + this.id + '/offers']);
  }
  suite(x: number){
    let dots = document.getElementById("dots"+x);
    let moreText = document.getElementById("more"+x);
    let btnText = document.getElementById("myBtn"+x);

    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Suite";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Masquer";
      moreText.style.display = "inline";
    }
}

}
