import { Component, OnInit } from '@angular/core';
//para la manipulacion del formulario
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//importacion del modelo
import { userModel } from 'src/app/models/user.model';
//importacion de servicio
import { DatosService } from 'src/app/services/datos.service';

import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  
  id: string | null;
  
  constructor(private fb:FormBuilder, private dataServices:DatosService,
    private aRote: ActivatedRoute,
    private router: Router) { 

this.id = this.aRote.snapshot.paramMap.get('id');
console.log(this.id)
this.form = this.fb.group({
nombre:['',Validators.required],
apellido:['',Validators.required],
dpi:['',[Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
correo:['',Validators.required],
direccion:['',Validators.required],
});

}

  form: FormGroup;
  loading = false;
  titulo = 'Agregar Usuario'

  ngOnInit(): void {
    this.leerEditar();
  }

  agregarEditar(){
    if (this.id === null){
      this.registerUser();
    }else{
      
      this.actualizarUsuario(this.id);
    }
  }

  registerUser(){
    const User: userModel= {
      nombre: this.form.value.nombre|| null, //null para que se registre de forma vacia
      apellido: this.form.value.apellido|| null,
      dpi: this.form.value.dpi|| null,
      correo: this.form.value.correo|| null,
      direccion: this.form.value.direccion|| null,
      fechaCreacion: new Date|| null,
      fehcaActualizacion: new Date|| null,
      
    }
    
    this.loading=true;
    this.dataServices.saveUser(User).then(()=>{
      this.loading=false;
      console.log('Bien','Tarjeta registrada');
      this.form.reset();
    },error =>{
      this.loading=false;
      console.log('Erro','error')
      console.log(error);
    })
    this.router.navigate(['./listUser'])
  }

  actualizarUsuario(id: string){
      const User: any= {
      nombre: this.form.value.nombre|| null, //null para que se registre de forma vacia
      apellido: this.form.value.apellido|| null,
      dpi: this.form.value.dpi|| null,
      correo: this.form.value.correo|| null,
      direccion: this.form.value.direccion|| null,
      fehcaActualizacion: new Date|| null,
      
    }
    this.loading =true;
    this.dataServices.actualizaUsuario(id,User).then(()=>{
    this.loading = false;
    console.log('Tarjeta modificada');
    this.form.reset();
    
    })
    this.router.navigate(['./listUser'])
  }


  leerEditar(){
    if (this.id !== null){
      this.dataServices.getUsuario(this.id).subscribe(data=>{
        console.log(data);
        this.form.setValue ({
        nombre: data.payload.data()['nombre'],
        apellido: data.payload.data()['apellido'],
        dpi:data.payload.data()['dpi'],
        correo: data.payload.data()['correo'],
        direccion: data.payload.data()['direccion']
    })
      })
    }
  }
}
