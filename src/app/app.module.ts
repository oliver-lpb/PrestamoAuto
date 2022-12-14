import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//para conectar a firebase
import { environment } from 'src/environments/environment';
import {AngularFireModule} from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

//para los baners y confirmaciones
import { ToastrModule } from 'ngx-toastr';

//para hacer funcionar el formulario
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//lista de componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './componente/add-user/add-user.component';
import { ListUserComponent } from './componente/list-user/list-user.component';
import { DashboardComponent } from './componente/dashboard/dashboard.component';
import { QuotationComponent } from './componente/quotation/quotation.component';
import { LoginComponent } from './componente/login/login.component';
import { NavegadorComponent } from './componente/navegador/navegador.component';
import { RegisterUserComponent } from './componente/register-user/register-user.component';

import { RetrivePasswordComponent } from './componente/retrive-password/retrive-password.component';




@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    ListUserComponent,
    DashboardComponent,
    QuotationComponent,
    LoginComponent,
    NavegadorComponent,
    RegisterUserComponent,

    RetrivePasswordComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //para conectar a firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    //para la autenticacion

    //para importar y usar el formulario
    ReactiveFormsModule,
    FormsModule,
    //estilos de baners
    BrowserAnimationsModule,
    ToastrModule.forRoot(),


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
