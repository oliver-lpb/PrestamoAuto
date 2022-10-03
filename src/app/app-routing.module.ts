import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUserComponent } from './componente/list-user/list-user.component';
import { AddUserComponent } from './componente/add-user/add-user.component';
import { DashboardComponent } from './componente/dashboard/dashboard.component';
import { QuotationComponent } from './componente/quotation/quotation.component';
import { LoginComponent } from './componente/login/login.component';

import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';

const routes: Routes = [
  
  {path: 'login', component:LoginComponent},

  {
    path: 'addUser', component:AddUserComponent, 
    canActivate: [AngularFireAuthGuard]
  },

  {
    path: 'editUsuario/:id',component:AddUserComponent
  },

  {
    path: 'listUser', component:ListUserComponent
  },

  {
    path: 'home', component:DashboardComponent
  },

  {
    path: 'quotation', component:QuotationComponent
  },
  

  {
    path:'', pathMatch:'full', redirectTo:'home'
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
