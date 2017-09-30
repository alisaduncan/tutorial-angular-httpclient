import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdToolbarModule, MdListModule, MdIconModule, MdButtonModule, MdDialogModule, MdDialogRef, MdInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { DialogComponent } from './dialog/dialog.component';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    MdListModule,
    MdIconModule,
    MdButtonModule,
    MdDialogModule,
    MdInputModule,
    FlexLayoutModule,
    FormsModule
  ],
  providers: [UserService, AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
