import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css']
})
export class QuotationComponent implements OnInit {

  interesTipo = 0;

  monto:number=0;
  cuotaDeseada:number=0;
  interesFijo:number=0;
  interesPorcentaje:number=0;
  fechaPago:string='';
  periodoPago:string='';
  cliete:string='';
  foto:string='';
  resultado:number=0;

  constructor() { }


  ngOnInit(): void {
  }

  tipoInteres(tipo:number){
    this.interesTipo=tipo;
    console.log(this.interesTipo)
  }

  calcular(){
    this.resultado = this.monto-this.cuotaDeseada;
  }

}
