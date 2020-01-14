import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {PaginatorModule} from 'primeng/paginator';


import {AppComponent} from './app.component';
import {routing} from './app.routing';

import {AuthGuard} from './_guards/auth.guard';
import {AuthenticationService, CanvasService, PointService, UserService} from './_services/index';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {RequestFormComponent} from './request-form/request-form.component';
import {CanvasComponent} from './canvas/canvas.component';
import {ButtonModule, CheckboxModule, KeyFilterModule, TableModule} from 'primeng';
import {HistoryTableComponent} from './history-table/history-table.component';
import {HeaderComponent} from './header/header.component';
import {registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import {NotAuthGuard} from './_guards/not-auth.guard';

registerLocaleData(localeRu, 'ru');

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        routing,
        CheckboxModule,
        ButtonModule,
        TableModule,
        KeyFilterModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        RequestFormComponent,
        CanvasComponent,
        HistoryTableComponent,
        HeaderComponent],
    providers: [
        AuthGuard,
        NotAuthGuard,
        AuthenticationService,
        HistoryTableComponent,
        RequestFormComponent,
        UserService,
        PointService,
        CanvasService,
        CanvasComponent,
        {provide: LOCALE_ID, useValue: 'ru'},
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
