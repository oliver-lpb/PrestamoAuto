import { Injectable } from '@angular/core';
//agrega firebase
import { AngularFirestore } from '@angular/fire/compat/firestore';
//modelo para guardar y recibir datos de firebase
import {userModel} from '../models/user.model';
//dependecia para usar Subject y Observable para obtener datos desde firebase
import { Observable, Subject } from 'rxjs';
//para la autenticaion
import { Auth,  } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { userAdminModel } from '../models/adminUser.model';

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

  // usarios admin
  saveUserAdmin(userForm:userAdminModel):Promise<any>{
    return this.firebase.collection('usuariosAdmin').add(userForm);
  }

  getUserAdmin():Observable<any>{
    return this.firebase.collection('usuariosAdmin',ref => ref.orderBy('correo','asc')).snapshotChanges();
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

  getUsuario(id: string): Observable<any>{
    return this.firebase.collection('usuarios').doc(id).snapshotChanges();
  }

  actualizaUsuario(id: string, data:any): Promise<any>{
    return this.firebase.collection('usuarios').doc(id).update(data);
  }

  //quotation servicios
  createDoc(data: any, path: string, id: string) {
    const collection = this.firebase.collection(path);
    return collection.doc(id).set(data);
  }

updateDoc(data: any, path: string, id: string) {
  const collection = this.firebase.collection(path);
  return collection.doc(id).set(data);
  }

}
