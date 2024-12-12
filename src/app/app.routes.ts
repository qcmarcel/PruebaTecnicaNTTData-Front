import { Routes } from '@angular/router';
import {ProfileComponent} from './components/profile/profile.component';
import {HomeComponent} from './components/home/home.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'profile/:type/:number', component: ProfileComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '**', pathMatch: 'full', redirectTo: ''}
];
