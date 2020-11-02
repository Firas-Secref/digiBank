import { OwnProsspectsComponent } from './countes/own-prosspects/own-prosspects.component';
import { SinglProspectComponent } from './countes/singl-prospect/singl-prospect.component';
import { AddOffresDialogComponent } from './add-offres-dialog/add-offres-dialog.component';
import { OffresComponent } from './offres/offres.component';
import { CountesListComponent } from './countes/countes-list/countes-list.component';
import { AuthGuardService } from './services/auth-guard.service';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SingleOffreComponent } from './offres/single-offre/single-offre.component';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'dashboard', canActivate: [AuthGuardService], component: DashboardComponent },
  { path: 'accounts', canActivate: [AuthGuardService] , component: CountesListComponent},
  { path: '', redirectTo: 'auth/signin', pathMatch: 'full' },
  { path: 'dashboard/userId/:id/offers',canActivate: [AuthGuardService], component: OffresComponent },
  { path: 'accounts/view/:id', canActivate: [AuthGuardService], component: SinglProspectComponent},
  { path: 'offre/view/:id', canActivate: [AuthGuardService], component: SingleOffreComponent},
  { path: 'accounts/prospectsPersonel',canActivate: [AuthGuardService], component: OwnProsspectsComponent },

  //{path: 'dashboard/userId/:id/odders/addOffers', canActivate: [AuthGuardService], component: AddOffresDialogComponent },
  //{ path: 'books/new', canActivate: [AuthGuardService], component: BookFormComponent },
  { path: 'dashboard/:id', canActivate: [AuthGuardService], component: DashboardComponent },
  //{ path: '**', redirectTo: 'dashboard' },

];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
