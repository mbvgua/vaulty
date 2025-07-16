import { Routes } from '@angular/router';
import { Homepage } from './components/homepage/homepage';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Homepage, title: 'Home Page' },
  //NOTE: lazy loaded the auth paths. faster loading
  {
    path: 'auth',
    children: [
      {
        path: 'signin',
        loadComponent: () =>
          import('./components/signin/signin.component').then(
            (m) => m.SigninComponent,
          ),
        title: 'Signin',
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./components/signup/signup.component').then(
            (m) => m.SignupComponent,
          ),
        title: 'Signup',
      },
    ],
  },
  //NOTE: add some redirect routes to see how they work
  { path: 'login', redirectTo: 'auth/signin' },
  { path: 'register', redirectTo: 'auth/signup' },

  //wildcard for none existent routes
  { path: '**', component: NotFound, title: 'Not Found' },
];
