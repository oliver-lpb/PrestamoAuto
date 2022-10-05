import { Component, OnInit } from '@angular/core';

//importacion del modelo
import { userModel } from 'src/app/models/user.model';
//importacion de servicio
import { DatosService } from 'src/app/services/datos.service';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users:userModel[]=[];
  initAddUser:boolean=false;


  constructor(private dataServices:DatosService) { }

  ngOnInit(): void {
    this.obtenerTarjeta();
  }

  obtenerTarjeta(){
    this.dataServices.getUser().subscribe(doc=>{
      this.users=[]
      doc.forEach((element:any)=>{
        this.users.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
  }

  eliminarTarjeta(id:any){

    this.dataServices.eliminarTarjeta(id).then(()=>{
      console.log('Bien','Tarjeta Eliminada');
    },error=>{console.log(error)})
  }

  initUser(){
    if(this.initAddUser==false){
      
      this.initAddUser=true;
    }else{
      this.initAddUser=false;
    }

  }

}
