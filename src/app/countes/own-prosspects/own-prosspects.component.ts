import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import { Prospect } from 'src/app/models/prospects.model';
import { CategoriesService } from 'src/app/shared/categories.service';
import { CountFormService } from 'src/app/shared/count-form.service';
import { InteractionService } from 'src/app/shared/interaction.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { ProspectService } from 'src/app/shared/prospect.service';
import { CountFormComponent } from '../count-form/count-form.component';

@Component({
  selector: 'app-own-prosspects',
  templateUrl: './own-prosspects.component.html',
  styleUrls: ['./own-prosspects.component.css']
})
export class OwnProsspectsComponent implements OnInit {

  prospects: Prospect[] = [];
  prospectsLength: number;
  prospect: Prospect;;

  constructor(private service: CountFormService,
              private categoriesService: CategoriesService,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private interactionService: InteractionService,
              private prospectService: ProspectService,
              private router: Router) { }
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['fullName', 'cin', 'mobile', 'birthDate', 'offreName', 'actions'];

  @ViewChild(MatSort) sort: MatSort;

  searchKey: string;
  accountsNumber: number;
  userName: string;
  ngOnInit(): void {
   this.userName = localStorage.getItem('userName');

   firebase.database().ref('/prospects').orderByChild('userName').equalTo(this.userName).on('value', (data: DataSnapshot) => {
    this.prospects = data.val() ? data.val() : [];
    this.prospectService.emitProspects();
    this.listData = new MatTableDataSource(this.prospects);
   })
    this.interactionService.sendAccountsNumber(this.prospects.length);
      // this.service.getCountes().subscribe(list => {
      //   const array = list.map(item => {
      //      //const offreName = this.categoriesService.getOffreName(item.payload.val()['offres']);
      //      return{
      //       $key: item.key,
      //       //offreName,
      //       ...item.payload.val(),
      //     };
      //   });
        // console.log('all affers', array)
        // this.listData = new MatTableDataSource(array);
        // this.listData.sort = this.sort;
        // this.accountsNumber = array.length;

    }


  onSearchClear(): void{
    this.searchKey = '';
    this.applayFilter();
  }

  applayFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate(){
    this.service.InitializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    this.dialog.open(CountFormComponent, {
      width: '820px'
    });
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    this.dialog.open(CountFormComponent, {
      width: '820px'
    });
  }

  onDelete($key){
    if (confirm('are you sure to delete this record.. ?')) {
      this.service.deleteCount($key);
      this.notificationService.warn('! Deleted successfully');
    }
  }
  onViewProspect(id: number){
    this.router.navigate(['/accounts', 'view', id]);
  }
  onUpdateProspect(id: number){

  }
  onDeleteProspect(prospect: Prospect){
    if (confirm('Voulez-vous vraiment supprimer ce prospect !?')) {
      this.prospectService.removeProspect(prospect);
      this.notificationService.warn('! Supprimer Avec Succés');
    }

  }
}

