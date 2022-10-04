import { Component, OnInit } from '@angular/core';
//para las rutas
import { Router } from '@angular/router';

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

  constructor(private authServices:AutenticacionService, private router:Router) { }

  ngOnInit(): void {
  }


  ingresar(){
    const{email,pass}= this.usario
    this.authServices.login(email,pass)
    .then(response => {
      console.log(response,'todo bien')
      this.router.navigate(['/home'])
    }
    )
    .catch(error => console.log(error,"error"));
  }


}
