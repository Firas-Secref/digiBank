import { Offre } from './../../models/offre.model';
import { OffersFormService } from './../../shared/offers-form.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-offre',
  templateUrl: './single-offre.component.html',
  styleUrls: ['./single-offre.component.css']
})
export class SingleOffreComponent implements OnInit {
  offre: Offre;
  constructor(private route: ActivatedRoute, private router: Router, private offersFormService: OffersFormService) { }

  ngOnInit(): void {
    this.offre = new Offre('', '', '');
    const id = this.route.snapshot.params['id'];
    this.offersFormService.getSingleOffre(+id).then(
      (offre: Offre) => {
        this.offre = offre;
        console.log('pppppp');

      }
    );
  }

}
