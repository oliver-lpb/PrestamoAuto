import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css']
})
export class QuotationComponent implements OnInit {
  interesTipo:number = 0;
  monto:number=0;
  cuotaDeseada:number=0;
  interesFijo:number=0;
  interesPorcentaje:number=0;
  fechaPago:string='';
  periodoPago:string='';
  cliete:string='';
  foto:string='';
  capital:number=0;
  resultado:number=0;
  saldo:number=0;
  porcentajeVariable:number=0;

  constructor() { }


  ngOnInit(): void {
  }

  tipoInteres(tipo:number){
    this.interesTipo=tipo;
    console.log(this.interesTipo)
  }

//comprueba que todos los datos esten llenos
  comprobacionDatos(){
this.porcentajeVariable=this.interesPorcentaje;
console.log(this.porcentajeVariable);
this.interesPorcentaje= this.monto*this.interesPorcentaje;  

if(this.interesTipo ==1){
    if (this.monto<this.cuotaDeseada || this.monto==0|| this.cuotaDeseada==0 || this.interesFijo==0 || this.fechaPago=="" || this.periodoPago==""|| this.cuotaDeseada<= this.interesFijo){
        console.log("Error datos no renellados o Interes mayor a la cuota deseada")
        return;
       } 
  this.calcularInteresFijo();
  }else if (this.interesTipo==2){
    if (this.monto<this.cuotaDeseada || this.monto==0|| this.cuotaDeseada==0 || this.fechaPago=="" || this.periodoPago==""|| this.cuotaDeseada<= this.interesPorcentaje || this.interesPorcentaje>= this.cuotaDeseada){
      console.log("Error datos no renellados o Interes % mayor a la cuota deseada")
      return;
     }   this.calcularInteresPorcentaje();
  }
 }


 calcularInteresPorcentaje(){
  console.log("Fecha_de_pago "+"Cuota fija "+"Intereses "+ "Capital " +"Saldo" );
  //variables
  let fecha = new Date(this.fechaPago);
  let contador =2;
     
//saldo inicial
this.saldo=this.monto;

//Impresion temporal
document.write ('<table cellspacing="5" border="2">');
document.write (" <tr><td>Fecha de pago");
document.write (" <tr><td>Fecha de pago <th>Cuota fija<th>Intereses<th>Capital <th>Saldo</tr>");
document.write ("<tr><td><td><td><td><td>"+this.saldo+"</td></tr>");


//para que inicie el dia que se eligio
if (this.periodoPago=="mensual"){
fecha.setDate(fecha.getDate() +1);
this.fechaPago=(fecha.getDate() + "/" + (fecha.getMonth() +1) + "/" + fecha.getFullYear());
} 

while ( contador >= 0) {
//capital calculo ciclo
this.interesPorcentaje = this.saldo * this.porcentajeVariable;
this.capital = this.cuotaDeseada - this.interesPorcentaje;
this.saldo = this.saldo - this.capital;

//impresion de pago temporal
document.write ("<tr><td>"+this.fechaPago+"<td>"+this.cuotaDeseada+"<td>"+this.interesPorcentaje+"<td>"+this.capital+"<td>"+this.saldo+"</tr>");

//condicion para sumar fecha 
if (this.periodoPago=="mensual"){
fecha.setMonth(fecha.getMonth()+1);
this.fechaPago=(fecha.getDate() + "/" + (fecha.getMonth() +1) + "/" + fecha.getFullYear());
}else if(this.periodoPago=="quincenal"){
fecha.setDate(fecha.getDate() + 15);
 this.fechaPago=(fecha.getDate()+1 + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear());
}else if(this.periodoPago=="semanal"){
fecha.setDate(fecha.getDate() + 7);
this.fechaPago=(fecha.getDate()+1 + "/" + (fecha.getMonth() +1) + "/" + fecha.getFullYear());
}  
  //cotador para finalisar el ciclo
  contador =this.saldo;
  } 
  document.writeln ("</table>");
}
 

  calcularInteresFijo(){
    //variables
    let fecha = new Date(this.fechaPago);
    let contador =2;
       
//saldo inicial
this.saldo=this.monto;

//para que inicie el dia que se eligio
if (this.periodoPago=="mensual"){
  fecha.setDate(fecha.getDate() +1);
  this.fechaPago=(fecha.getDate() + "/" + (fecha.getMonth() +1) + "/" + fecha.getFullYear());
} 

//Impresion temporal
document.write ('<table cellspacing="5" border="2">');
document.write (" <tr><td>Fecha de pago <th>Cuota fija<th>Intereses<th>Capital <th>Saldo</tr>");
document.write ("<tr><td><td><td><td><td>"+this.saldo+"</td></tr>");

//condicion para elegir el tipo de interes
while ( contador >= 1) {
  //capital calculo ciclo
  this.capital = this.cuotaDeseada - this.interesFijo;
  this.saldo = this.saldo - this.capital;

  //impresion de pago temporal
document.write ("<tr><td>"+this.fechaPago+"<td>"+this.cuotaDeseada+"<td>"+this.interesFijo+"<td>"+this.capital+"<td>"+this.saldo+"</tr>");

//condicion para sumar fecha 
 if (this.periodoPago=="mensual"){
  fecha.setMonth(fecha.getMonth()+1);
  this.fechaPago=(fecha.getDate() + "/" + (fecha.getMonth() +1) + "/" + fecha.getFullYear());
  }else if(this.periodoPago=="quincenal"){
  fecha.setDate(fecha.getDate() + 15);
   this.fechaPago=(fecha.getDate()+1 + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear());
  }else if(this.periodoPago=="semanal"){
  fecha.setDate(fecha.getDate() + 7);
  this.fechaPago=(fecha.getDate()+1 + "/" + (fecha.getMonth() +1) + "/" + fecha.getFullYear());
  }  
    //cotador para finalisar el ciclo
    contador =this.saldo;
    }  
    document.writeln ("</table>");
  }
}