import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css']
})
export class QuotationComponent implements OnInit {

  interesTipo = 0;

  constructor() { }


  ngOnInit(): void {
  }

  tipoInteres(tipo:number){
    this.interesTipo=tipo;
    console.log(this.interesTipo)
  }

}
