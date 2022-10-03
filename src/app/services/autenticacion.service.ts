import { Injectable } from '@angular/core';
//autenticacion
import {AngularFireAuth} from '@angular/fire/compat/auth'
import firebase from 'firebase/compat/app'

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(private authFire:AngularFireAuth) { }

  async register(email:string,pass:string){
    try{
        return await this.authFire.createUserWithEmailAndPassword(email,pass);
    }catch(err){
        console.log(err)
        return null;
    }
  }
//login con corrreo y contrasenia 
  login(email:string,pass:string){
    return this.authFire.signInWithEmailAndPassword(email,pass);
  }

//obtenerDatosdelUsario
  obternerUserLogin(){
    return this.authFire.authState;
  }
//cerrar sesion
  logOut(){
    this.authFire.signOut();
    console.log('sesion cerrada')
}
}
