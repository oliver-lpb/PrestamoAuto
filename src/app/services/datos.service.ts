import { Injectable } from '@angular/core';
//agrega firebase
import { AngularFirestore } from '@angular/fire/compat/firestore';
//modelo para guardar y recibir datos de firebase
import {userModel} from '../models/user.model';
//dependecia para usar Subject y Observable para obtener datos desde firebase
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  private userModel$= new Subject<any>();

  constructor(private firebase:AngularFirestore) { }

  saveUser(userForm:userModel):Promise<any>{
    return this.firebase.collection('usuarios').add(userForm);
  }

  getUser():Observable<any>{
    return this.firebase.collection('usuarios',ref => ref.orderBy('fechaCreacion','asc')).snapshotChanges();
  }



  //en edicion
  eliminarTarjeta(id:string): Promise<any>{
    return this.firebase.collection('usuarios').doc(id).delete();
  }

  editaTarjeta(id:string,tarjeta:any): Promise<any>{
    return this.firebase.collection('usuarios').doc(id).update(tarjeta);
  }

  addTarjetaEdit(tarjeta:userModel){
    this.userModel$.next(tarjeta);
  }

  getTarjetaEdit():Observable<userModel>{
    return this.userModel$.asObservable();
  }

}
