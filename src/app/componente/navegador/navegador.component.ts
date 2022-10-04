import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-navegador',
  templateUrl: './navegador.component.html',
  styleUrls: ['./navegador.component.css']
})
export class NavegadorComponent implements OnInit {

  constructor(private autenticacion:AutenticacionService, private router:Router) { }

  ngOnInit(): void {
  }

  cerrar(){
    this.autenticacion.logOut();

  }

}
