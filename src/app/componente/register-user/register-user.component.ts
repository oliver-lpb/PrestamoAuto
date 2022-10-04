import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validator, Validators} from '@angular/forms';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  registerUser:FormGroup;

  constructor(private fb:FormBuilder, private aAuth: AutenticacionService, private toastr: ToastrService) { 
    this.registerUser = this.fb.group({
      email:['', Validators.required],
      password:['', Validators.required],
      repetirPassword:['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  registrar(){
    const email = this.registerUser.value.email;
    const password = this.registerUser.value.password;
    const repetirPassword = this.registerUser.value.repetirPassword;

    if(password != repetirPassword){
      this.toastr.error('Las contrasenias no son iguales','Error');
      return;
    }


    this.aAuth.register(email,password).then(()=> {
      this.aAuth.verifictedUsers();
      this.toastr.success('Se envia correo','Usario Registrado')
    })
    .catch((error)=>{
      console.log(error, 'todo mal');
      this.toastr.error(this.aAuth.firebaseError(error.code),'Error')
    })
  }

}
