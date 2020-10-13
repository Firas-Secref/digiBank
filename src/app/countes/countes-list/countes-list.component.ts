import { ProspectService } from './../../shared/prospect.service';
import { Prospect } from './../../models/prospects.model';
import { InteractionService } from './../../shared/interaction.service';
import { Offre } from './../../models/offre.model';
import { NotificationService } from './../../shared/notification.service';
import { CountFormComponent } from './../count-form/count-form.component';
import { CategoriesService } from '../../shared/categories.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CountFormService } from 'src/app/shared/count-form.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;


@Component({
  selector: 'app-countes-list',
  templateUrl: './countes-list.component.html',
  styleUrls: ['./countes-list.component.css']
})
export class CountesListComponent implements OnInit {

  prospects: Prospect[] = [];
  prospectsLength: number;

  constructor(private service: CountFormService,
              private categoriesService: CategoriesService,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private interactionService: InteractionService,
              private prospectService: ProspectService) { }
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
}
