import { Component, OnInit } from '@angular/core';
import { remove } from '@angular/fire/database';
import { Firestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { child, getDatabase, push, ref, set, update } from 'firebase/database';

@Component({
  selector: 'app-unit-funcion',
  templateUrl: './unit-funcion.component.html',
  styleUrls: ['./unit-funcion.component.css']
})
export class UnitFuncionComponent implements OnInit {


  product : any ; 
  constructor(dbs : Firestore) { }

  ngOnInit(): void {
    // this.resetForm();
    // this.service.select;
  }

  
  onSubmit(productForm: NgForm)
  {
    let item  = productForm.value;
    const db = getDatabase();
        set(ref(db, 'UsersData/LCKSCzPK0TRN1LrXx8V28iQdJYz1/' + item.id), {
          RFID : item.RFID,
          Fecha : item.Fecha,
          Luz : item.Luz
        });
        // this.resetForm(productForm);
  }


  remove(item: any) {
      //  console.log("remove == ",item.hora);
        const db = getDatabase();
     remove(ref(db, 'UsersData/LCKSCzPK0TRN1LrXx8V28iQdJYz1/' + item.value.id));
  }

  // resetForm(productForm?: NgForm)
  // {
  //   if(productForm != null)
  //     productForm.reset();
  //     this.service.select = new Modelo();
  // }

}
