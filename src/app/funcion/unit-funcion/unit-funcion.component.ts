import { Component, OnInit } from '@angular/core';
import { remove } from '@angular/fire/database';
import { Firestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { child, getDatabase, push, ref, set, update } from 'firebase/database';
import { Modelo } from 'src/app/modelo/modelo';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-unit-funcion',
  templateUrl: './unit-funcion.component.html',
  styleUrls: ['./unit-funcion.component.css']
})
export class UnitFuncionComponent implements OnInit {


  product : any ; 
  constructor(dbs : Firestore,public service : ServiceService) { }

  ngOnInit(): void {
    this.resetForm();
    // this.service.select;
  }

  
  onSubmit(productForm: NgForm)
  {
    let item = productForm.value;
    console.log("item == ",item.count);
    const db = getDatabase();
        set(ref(db, 'as/aaasta/' + item.hora), {
          count: item.count,
          valor: item.valor
        });
        this.resetForm(productForm);
  }


  // remove(item: any) {
  //     //  console.log("remove == ",item.hora);
  //       const db = getDatabase();
  //    remove(ref(db, 'as/aaasta/' + item.value.hora));
  // }

  resetForm(productForm?: NgForm)
  {
    if(productForm != null)
      productForm.reset();
      this.service.select = new Modelo();
  }

}
