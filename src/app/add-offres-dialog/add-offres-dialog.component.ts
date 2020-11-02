import { Categorie } from './../models/categorie.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllOffersService } from './../shared/all-offers.service';
import { Offre } from './../models/offre.model';
import { CategoriesService } from './../shared/categories.service';
import { OffersFormService } from './../shared/offers-form.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../shared/notification.service';
import { UserService } from '../shared/user.service';
import { User } from '../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { InteractionService } from '../shared/interaction.service';


@Component({
  selector: 'app-add-offres-dialog',
  templateUrl: './add-offres-dialog.component.html',
  styleUrls: ['./add-offres-dialog.component.css']
})
export class AddOffresDialogComponent implements OnInit {

  userName: string;
  addOffForm: FormGroup;
  user: User;
  categories : any[];
  fileIsUploading = false;
  fileUploaded = false;
  fileUrl: string;
  constructor(private dialog: MatDialog,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private interactionService: InteractionService,
              private service: OffersFormService,
              private userService: UserService,
              private notification: NotificationService,
              public categoriesService: CategoriesService,
              private allOffersService: AllOffersService,
              public dialogRef: MatDialogRef<AddOffresDialogComponent>) {}
              //addOffForm= this.service.addOffForm;
  ngOnInit(): void {

    this.categoriesService.getCat();

    this.categoriesService.getCategories().subscribe(result => {
      console.log('next', result) ;

      // let arr = [];
      // Object.keys(result).map((key)=>{
      //   arr.push({[key]:result[key]})
      // return arr; });
      // console.log('array', arr);

      console.log('just values!', Object.values(result)) ;
      this.categories = Object.values(result) ;


    },
    error => {
      console.log('error:', error);
    })
    this.userName = this.interactionService.getMsg();
     // this.interactionService.userName$.subscribe(
  //   userName => {
  //     this.userName = userName;
  //     console.log('name received ',userName);
  //   }
  // );
  this.initForm();
  this.allOffersService.getOffres();
    // this.userService.getSingleUserr(this.id).then(
    //   (user: User) => {
    //     this.user = user;
    //     console.log('id',this.id);

    //     console.log('user',typeof user);
    //     console.log('this.user inside', this.user);
    //   }
    // );
  }

  initForm(){
    this.addOffForm = this.formBuilder.group({
      categorie: [ '', [Validators.required]],
      offreTitle: [ '', [Validators.required]],
      description: [ '', [Validators.required]],
      photo: [ '', [Validators.required]]
    });
  }

  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    this.dialog.open(AddOffresDialogComponent, {
      width: '700px'
    });
  }

  onSubmit(){

    const categorie = this.addOffForm.get('categorie').value;
    const offreName = this.addOffForm.get('offreTitle').value;
    const description = this.addOffForm.get('description').value;

    const newOffre = new Offre(offreName, categorie, description);
    if (this.fileUrl && this.fileUrl !== '') {
      newOffre.photo = this.fileUrl;
    }
    newOffre.userName = this.userName;

    this.allOffersService.createNewOffre(newOffre);
    this.notification.success(':: Submitted successfully');
    //

    // if (this.addOffForm.valid){
    //   this.service.addOffre(this.service.addOffForm.value);
    // }
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }
  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.allOffersService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }



}
