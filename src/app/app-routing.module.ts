import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { MainComponent } from './Components/main/main.component';
import { AddPrisComponent } from './Components/add-pris/add-pris.component';
import { ViewPrisComponent } from './Components/view-pris/view-pris.component';
import { AuthGuard } from './Guard/auth.guard';
import { AdminGuard } from './Guard/admin.guard';
import { GalsaComponent } from './Components/galsa/galsa.component';
import { EndedListComponent } from './Components/ended-list/ended-list.component';
import { OutSourceComponent } from './Components/out-source/out-source.component';
import { PrintComponent } from './Components/print/print.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'login', component: LoginComponent, redirectTo: ''
  }
  ,
  { path: 'printPresionData/:data', component: PrintComponent },

  {
    path: 'register', component: RegisterComponent , canActivate:[AdminGuard]
  },
  {
    path: 'main', component: MainComponent,canActivate:[AuthGuard] , children:[
      {
        path: 'add', component: AddPrisComponent
      },
      {
        path: 'view', component: ViewPrisComponent
      },
      {
        path: 'galsa', component: GalsaComponent
      },
      {
        path: 'ended', component: EndedListComponent
      },
      {
        path: 'outSource', component: OutSourceComponent
      },

    ]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
