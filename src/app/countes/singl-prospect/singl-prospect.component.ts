import { ProspectService } from './../../shared/prospect.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Prospect } from './../../models/prospects.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-singl-prospect',
  templateUrl: './singl-prospect.component.html',
  styleUrls: ['./singl-prospect.component.css']
})
export class SinglProspectComponent implements OnInit {

  prospect: Prospect
  constructor(private route: ActivatedRoute, private prospectService: ProspectService, private router: Router) { }

  ngOnInit(): void {
    this.prospect = new Prospect('', '', '', 0, [], '');
    const id = this.route.snapshot.params['id'];
    this.prospectService.getSingleProspect(+id).then(
      (prospect: Prospect) => {
        this.prospect = prospect;
      }
    )
  }

}
