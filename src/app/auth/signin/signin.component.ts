import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/models/user.model';
import { InteractionService } from 'src/app/shared/interaction.service';
import * as firebase from 'firebase';




@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user: User;
  userName: string;
  id: number;
  signinForm: FormGroup;
  errorMessage: string;
  isAuth= false;
  authentifier: boolean;

  constructor(private interactionService: InteractionService,
              private formBuilder: FormBuilder, private authService: AuthService,
              private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.initForm();
    this.userService.getUsers();
    console.log(this.isAuth);
  }

  initForm(): void {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit(): void {
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;

    this.authService.signInUser(email, password).then(
      (data) => {
        console.log('data', data);

        for (let id = 0; id < 36 ; id++){
          this.userService.getSingleUser(id).then(
            (user: User) => {
              this.user = user;


              if (user && user.email === email) {
                this.id = id;
                this.userName = user.userName;
                localStorage.setItem('userName',user.userName);
                this.interactionService.sendUserName(this.userName);
                this.router.navigate(['/dashboard/' + id]);
                localStorage.setItem('image', this.user.photo);
                firebase.auth().onAuthStateChanged(
                  (user) => {
                    if (user) {
                      this.isAuth = true;
                      localStorage.setItem('authentifier', 'oui' );

                    } else {
                      this.isAuth = false;
                      localStorage.setItem('authentifier', 'non' );

                    }
                  }
                );
              }
            }
          );

        }

      },
      (error) => {
        this.errorMessage = error;
      }
    );

    console.log(this.isAuth);


  }




}
