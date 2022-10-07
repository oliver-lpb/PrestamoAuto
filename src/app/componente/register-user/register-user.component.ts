import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validator, Validators} from '@angular/forms';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

import { ToastrService } from 'ngx-toastr';
import { userAdminModel } from 'src/app/models/adminUser.model';
import { DatosService } from 'src/app/services/datos.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  usersAdmins:userAdminModel[]=[];
  registerUser:FormGroup;
  submitted = false;

  constructor(private fb:FormBuilder, private aAuth: AutenticacionService, private toastr: ToastrService, private datos:DatosService) { 
    this.registerUser = this.fb.group({
      nombre:['', Validators.required],
      apellido:['', Validators.required],
      correo:['', Validators.required],
      password:['', Validators.required],
      repetirPassword:['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.obtenerTarjeta();
  }

  registrar(){
    const correo = this.registerUser.value.correo;
    const password = this.registerUser.value.password;
    const repetirPassword = this.registerUser.value.repetirPassword;

    if(password != repetirPassword){
      this.toastr.error('Las contrasenias no son iguales','Error');
      return;
    }


    this.aAuth.register(correo,password).then(()=> {
      this.aAuth.verifictedUsers();
      this.registerUserAdmin();
      this.toastr.success('Se envia correo','Usario Registrado')
    })
    .catch((error)=>{
      console.log(error, 'todo mal');
      this.toastr.error(this.aAuth.firebaseError(error.code),'Error')
    })
  }

  registerUserAdmin() {
    console.log(this.registerUser);
    this.submitted = true;
    //condicion para validar formulario
    if (this.registerUser.invalid) {
      return;
    }
    const User: any = {
      nombre: this.registerUser.value.nombre, //quite el null
      apellido: this.registerUser.value.apellido,
      correo: this.registerUser.value.correo,
      password: this.registerUser.value.password,
      repetirPassword: this.registerUser.value.repetirPassword,
      
    };
    
    this.datos.saveUserAdmin(User).then(
      () => {
        
        this.registerUser.reset();
      },
      (error) => {
        this.toastr.error('No se logro registrar al Usarui','Error')
        console.log(error);
      }
    );
    
  }

  obtenerTarjeta(){
    this.datos.getUserAdmin().subscribe(doc=>{
      this.usersAdmins=[];
      doc.forEach((element:any)=>{   
        this.usersAdmins.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
  }

}
