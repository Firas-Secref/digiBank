import { Offre } from './../../models/offre.model';
import { ProspectService } from './../../shared/prospect.service';
import { Prospect } from './../../models/prospects.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllOffersService } from './../../shared/all-offers.service';
import { CategoriesService } from '../../shared/categories.service';
import { NotificationService } from './../../shared/notification.service';
import { CountFormService } from './../../shared/count-form.service';
import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { InteractionService } from '../../shared/interaction.service';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
@Component({
  selector: 'app-count-form',
  templateUrl: './count-form.component.html',
  styleUrls: ['./count-form.component.css']
})
export class CountFormComponent implements OnInit {

  groupForm;
  countForm: FormGroup;
  userName: string;
  offres: any[];
  categories : any[];

  constructor( private prospectService: ProspectService ,
               private service: CountFormService,
               private notification: NotificationService,
               private categoriesService: CategoriesService,
               private dialogRef: MatDialogRef<CountFormComponent>,
               private interactionService: InteractionService,
               private formBuilder: FormBuilder,
               private allOffersService: AllOffersService ) {
               this.groupForm = service.form;
   }

  ngOnInit(): void {

    this.userName = this.interactionService.getMsg();
    console.log('username',this.userName);


    firebase.database().ref('/offres').on('value', (data: DataSnapshot) => {
      this.offres = data.val() ? data.val() : [];
      this.allOffersService.emitOffres();
      console.log(this.offres);
      console.log(this.offres.length);
    });

    //this.offres = this.allOffersService.array
    this.categories = this.categoriesService.categories;
    this.initForm();
    this.categoriesService.getCategories();

    console.log(this.categoriesService.getCategories());

    //console.log(this.categoriesService.categories);
    this.userName = localStorage.getItem('userName');


  }

  initForm(){
    this.countForm = this.formBuilder.group({
      prospectName: ['', [Validators.required]],
      cin: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      categorieName: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      offreName: ['', []]
    })
  }

  onClear(): void{
    this.groupForm.reset();
    this.groupForm.InitializeFormGroup();
  }

  onSubmit(): void{


      console.warn(this.groupForm);
      const prospectName = this.countForm.get('prospectName').value;
      const cin = this.countForm.get('cin').value;
      const phoneNumber = this.countForm.get('phoneNumber').value;
      const birthDate =  Date.parse(this.countForm.get('birthDate').value);
      console.log(birthDate);

      const offreName = this.countForm.get('offreName').value;

      const newProspect = new Prospect(prospectName, cin, phoneNumber, birthDate, offreName )
      newProspect.userName = this.userName;
      this.prospectService.addNewProspect(newProspect);
      this.notification.success(':: Submitted successfully');





    // console.warn(this.groupForm);
    // if (this.groupForm.valid){
    //   if (!this.service.form.get('$key').value){
    //     this.service.insertCount(this.groupForm.value);
    //   }
    //   else{
    //     this.service.updateCount(this.service.form.value);
    //     console.log('form values', this.service.form.value);
    //     this.notification.success(':: Submitted successfully');
    //     this.groupForm.reset();
    //     this.groupForm.InitializeFormGroup();
    //     this.onClose();
    //   }
    //   console.warn(this.allOffersService.array);

    // }
  }

  onClose(){
    // this.service.form.reset();
    // this.service.InitializeFormGroup();
    // this.dialogRef.close();
  }

  getValue(){
    // return this.service.form.get('offers').value;
  }

}
