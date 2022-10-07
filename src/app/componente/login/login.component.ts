import { Component, OnInit } from '@angular/core';
//para las rutas
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

//para la autenticacion
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //para enviar los datos
  usario={
    email:'',
    pass:''
  }


  constructor(private authServices:AutenticacionService, private router:Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }


  ingresar(){
    const{email,pass}= this.usario
    this.authServices.login(email,pass)
    .then(response => {
      if(response.user?.emailVerified){
        this.router.navigate(['/home'])

      }else{
        alert('No esta verificado revise el correo')
      }

     // this.router.navigate(['/home'])
    }
    )
    .catch(() => {

      this.toastr.error("Correo o contrasenia incorrectos","Error")
    });
  }


}
