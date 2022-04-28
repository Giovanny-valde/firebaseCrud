import { Component, OnInit } from '@angular/core';
import { getDatabase,  ref, onValue, remove} from 'firebase/database';
import {  Firestore } from '@angular/fire/firestore';
import {  Observable } from 'rxjs';
import { ServiceService } from '../service/service.service';
import { Modelo } from '../modelo/modelo';
import { keepUnstableUntilFirst } from '@angular/fire';
import { keyframes } from '@angular/animations';
import { object } from 'rxfire/database';
// import { get } from 'http';

@Component({
  selector: 'app-funcion',
  templateUrl: './funcion.component.html',
  styleUrls: ['./funcion.component.css']
})
export class FuncionComponent implements OnInit {

  item$: Observable<any[]> = new Observable();
  items : any[] = [];
  // total : number = 0;
  entradas: {total: number, empleados: number, clientes: number} = {total: 0, empleados: 0, clientes: 0};
  salidas: {total: number, empleados: number, clientes: number} = {total: 0, empleados: 0, clientes: 0};
  constructor( dbs : Firestore , public  db : ServiceService) {

  }
  
  ngOnInit(): void {

    const daba = getDatabase();   

    const starCountRef = ref(daba, 'UsersData/Ingresos/');
    onValue(starCountRef, (snapshot) => {
      this.items = [];
       this.entradas = {total: 0, empleados: 0, clientes: 0};
       this.salidas = {total: 0, empleados: 0, clientes: 0};
       let x;
      let data  = snapshot.forEach((element : any) => {
        x = element.val();
        console.log(element.val());
        
        let llave = element.key
        console.log(llave);
        var expresionRegular = /\s*_\s*/;
        var resultado = llave.split(expresionRegular);
        let date = new Date();
        let mes = date.getMonth()>10 ? (date.getMonth()+1 ): "0"+(date.getMonth()+1);

        // let datee = date.getDate() + "-" + mes + "-" + date.getFullYear();
         let datee = 20 + "-" + mes + "-" + date.getFullYear();

        if(resultado[0] == datee)
        {
          if(x.ingreso = 1){
            x.Empleado == 1 ? this.entradas.empleados++ : this.entradas.clientes++;
            this.entradas.total++;
          }
          else{
            x.Empleado == 1 ? this.salidas.empleados++ : this.salidas.clientes++;
            this.salidas.total++;
          }

          this.items.push(x);
        }

      });
    });

  }

  updateItem(item: Modelo) {
    this.db.select = Object.assign({}, item);
    this.db.update();
  }

  
  remove(item: any) {
    //  console.log("remove == ",item.hora);
      const db = getDatabase();
      let a = confirm("Esta seguro de eliminar el registro?");
      if(a)
      {
        remove(ref(db, 'as/aaasta/' + item.hora));
        alert("Registro eliminado");
      }
      else{
        alert("Registro no eliminado");
      }
      //  remove(ref(db, 'as/aaasta/' + item.value.hora));
  }

    // this.db.getProducts().snapshotChanges().subscribe((data : any) => {
    //   data.forEach((element : any) => {
    //     console.log("element == ",element);
    //     this.items.push(element);
    //   });
    // });
    // this.item$.subscribe(data => {
    //   console.log(data);
    // });
  

}
