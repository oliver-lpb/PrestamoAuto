import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-retrive-password',
  templateUrl: './retrive-password.component.html',
  styleUrls: ['./retrive-password.component.css']
})
export class RetrivePasswordComponent implements OnInit {

  recuperar:FormGroup


  constructor(private fb:FormBuilder, private aAuth: AutenticacionService, private toastr: ToastrService, private router:Router) { 
    this.recuperar = this.fb.group({
      email:['', Validators.required],
      
    })
  }

  ngOnInit(): void {
  }

  retriveUser(){
    const email = this.recuperar.value.email;
    this.aAuth.retriveUsers(email).then(()=>{
      this.toastr.info('Se envio un correo para restablecer la contrasenia','Recuperar password')
      this.router.navigate(['/login'])
    }).catch((error)=>{
      this.toastr.error(this.aAuth.firebaseError(error.code),error);
    })
  }

}
