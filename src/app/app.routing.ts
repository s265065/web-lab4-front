import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from './_guards/auth.guard';
import {NotAuthGuard} from './_guards/not-auth.guard';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent,  canActivate: [NotAuthGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
