import { Component, OnInit } from '@angular/core';
import { remove } from '@angular/fire/database';
import { Firestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { child, getDatabase, push, ref, set, update } from 'firebase/database';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-unit-funcion',
  templateUrl: './unit-funcion.component.html',
  styleUrls: ['./unit-funcion.component.css']
})
export class UnitFuncionComponent implements OnInit {

  constructor(dbs : Firestore,public service : ServiceService) { }

  ngOnInit(): void {
    // this.service.select;
  }

  
  onSubmit(productForm: NgForm)
  {
    let item = productForm.value;
    console.log("item == ",item.count);
    const db = getDatabase();

    console.log(ref(db, 'as/aaasta/' + item.hora));
        set(ref(db, 'as/aaasta/' + item.hora), {
          count: item.count,
          valor: item.valor
        });
  }


  remove(item: any) {
      //  console.log("remove == ",item.hora);
        const db = getDatabase();
     remove(ref(db, 'as/aaasta/' + item.value.hora));
  }

}
