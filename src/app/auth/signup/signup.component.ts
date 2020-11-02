import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/models/user.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  id: number = 0;
  user:User;
  signupForm: FormGroup;
  errorMessage: string;

  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  constructor(private formBuilder: FormBuilder, private authService: AuthService,
     private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.initForm();
    this.userService.getUsers();
    console.log(this.userService.getUsers() );

    this.userService.getSingleUser(this.id).then(
      (user: User) => {
        this.user = user;
        console.log('user inside', user.email);
        console.log('this.user inside', this.user);

      }
    );
    console.log('this.user outside',this.user);

  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {
    console.log('current user',this.user)
    this.id++;
    console.log('next user',this.user);
    console.log('this id',this.id);

    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    const userName = this.signupForm.get('userName').value;

    const newUser = new User(email, userName, password);

    if (this.fileUrl && this.fileUrl !== '') {
      newUser.photo = this.fileUrl;
    }
    this.userService.addNewUser(newUser);
    this.authService.createNewUser(email, password).then(
      () => {
        this.router.navigate(['/auth/signin']);
        //firebase.auth().tenantId ="10011";
        //console.log(firebase.auth().tenantId)
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.userService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

}
