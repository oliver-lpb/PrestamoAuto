import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUserComponent } from './componente/list-user/list-user.component';
import { AddUserComponent } from './componente/add-user/add-user.component';
import { DashboardComponent } from './componente/dashboard/dashboard.component';
import { QuotationComponent } from './componente/quotation/quotation.component';
import { LoginComponent } from './componente/login/login.component';

import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { RegisterUserComponent } from './componente/register-user/register-user.component';

const routes: Routes = [
  
  {path: 'login', component:LoginComponent},

  {
    path: 'addUser', component:AddUserComponent, 
    canActivate: [AngularFireAuthGuard]
  },

  {
    path: 'editUsuario/:id',component:AddUserComponent,
    canActivate: [AngularFireAuthGuard]
  },

  {
    path: 'listUser', component:ListUserComponent,
    canActivate: [AngularFireAuthGuard]
  },

  {
    path: 'home', component:DashboardComponent,
    canActivate: [AngularFireAuthGuard]
  },

  {
    path: 'quotation', component:QuotationComponent,
    canActivate: [AngularFireAuthGuard]
  },
  
  {
    path: 'usuarios', component:RegisterUserComponent,
    canActivate: [AngularFireAuthGuard]
  },

  {
    path:'', pathMatch:'full', redirectTo:'login'
  },

  {
    path:'**', pathMatch:'full', redirectTo:'home'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
