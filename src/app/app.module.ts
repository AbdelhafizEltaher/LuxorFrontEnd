import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from "ngx-loading";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './Components/main/main.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { SidemenuComponent } from './Components/sidemenu/sidemenu.component';
import { LoginComponent } from './Components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './Components/register/register.component';
import { AddPrisComponent } from './Components/add-pris/add-pris.component';
import { ViewPrisComponent } from './Components/view-pris/view-pris.component';
import { PrimengModule } from './Services/Ui';
import { GalsaComponent } from './Components/galsa/galsa.component';
import { EndedListComponent } from './Components/ended-list/ended-list.component';
import { OutSourceComponent } from './Components/out-source/out-source.component';
import { PrintComponent } from './Components/print/print.component';
import { EditComponent } from './Components/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    SidemenuComponent,
    LoginComponent,
    RegisterComponent,
    AddPrisComponent,
    ViewPrisComponent,
    GalsaComponent,
    EndedListComponent,
    OutSourceComponent,
    PrintComponent,
    EditComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    PrimengModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circle,
      fullScreenBackdrop: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
