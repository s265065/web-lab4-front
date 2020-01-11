import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import { AlertService, AuthenticationService, UserService, DotService, CanvasService} from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import {RequestFormComponent} from './request-form/request-form.component';
import {CanvasComponent} from './canvas/canvas.component';
import {ButtonModule, CheckboxModule, KeyFilterModule, TableModule} from 'primeng';
import { HistoryTableComponent } from './history-table/history-table.component';
import { HeaderComponent } from './header/header.component';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { LOCALE_ID} from '@angular/core';

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
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RequestFormComponent,
    CanvasComponent,
    HistoryTableComponent ,
    HeaderComponent],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
      DotService,
      CanvasService,
      CanvasComponent,
      { provide: LOCALE_ID, useValue: 'ru' },
      // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
