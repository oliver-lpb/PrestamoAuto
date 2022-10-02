import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//para conectar a firebase
import { environment } from 'src/environments/environment';
import {AngularFireModule} from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
//para hacer funcionar el formulario
import { ReactiveFormsModule } from '@angular/forms';

//lista de componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './componente/add-user/add-user.component';
import { ListUserComponent } from './componente/list-user/list-user.component';
import { DashboardComponent } from './componente/dashboard/dashboard.component';
import { QuotationComponent } from './componente/quotation/quotation.component';


@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    ListUserComponent,
    DashboardComponent,
    QuotationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //para conectar a firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    //para importar y usar el formulario
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
