import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-navegador',
  templateUrl: './navegador.component.html',
  styleUrls: ['./navegador.component.css']
})
export class NavegadorComponent implements OnInit {

  constructor(private autenticacion:AutenticacionService) { }

  ngOnInit(): void {
  }

  cerrar(){
    this.autenticacion.logOut();
  }

}
