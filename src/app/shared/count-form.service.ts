import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class CountFormService {

  constructor(private fireBase: AngularFireDatabase) { }
  countList: AngularFireList <any> ;



  form: FormGroup = new FormGroup ({
    fullName: new FormControl('', Validators.required),
    birthDate: new FormControl(''),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    cin: new FormControl(''),
    offres: new FormControl([]),
    categorie: new FormControl(''),
  });

   InitializeFormGroup(){
    this.form.setValue({
      fullName: '',
      mobile: '',
      cin: '',
      birthDate: '',
      categorie: '',
      offres: []
    });
   }
   // tslint:disable-next-line: typedef
   getCountes(){
    this.countList = this.fireBase.list('countes');
    console.log('countes', this.countList);
    return this.countList.snapshotChanges();
   }
   insertCount(count): void{
     console.warn(count);
     this.countList.push({
       fullName: count.fullName,
       mobile: count.mobile,
       cin: count.cin,
       birthDate: count.birthDate,
       categorie: count.categorie,
       offres: count.offres
     });
   }
   updateCount(count): void{
    this.countList.update(count.$key, {
      fullName: count.fullName,
      mobile: count.mobile,
      cin: count.cin,
      birthDate: count.birthDate,
      categorie: count.categorie,
      offres: count.offres

    });
   }

   deleteCount($key: string): void{
    this.countList.remove($key);
  }

  populateForm(count){
    this.form.setValue(_.omit(count, 'offreTitle'));
  }
}
