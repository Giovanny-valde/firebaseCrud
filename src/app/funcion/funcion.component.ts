import { Component, OnInit } from '@angular/core';
import { getDatabase,  ref, onValue, remove} from 'firebase/database';
import {  Firestore } from '@angular/fire/firestore';
import {  Observable } from 'rxjs';
// import { Modelo } from '../modelo/modelo';
import { FormBuilder } from '@angular/forms';
// import { get } from 'http';

@Component({
  selector: 'app-funcion',
  templateUrl: './funcion.component.html',
  styleUrls: ['./funcion.component.css']
})
export class FuncionComponent implements OnInit {

  item$: Observable<any[]> = new Observable();
  items : any[] = [];
  fecha = " ";
  // total : number = 0;
  entradas: {total: number, empleados: number, clientes: number} = {total: 0, empleados: 0, clientes: 0};
  salidas: {total: number, empleados: number, clientes: number} = {total: 0, empleados: 0, clientes: 0};
  constructor( dbs : Firestore ,private fb : FormBuilder ) {

  }
  
  ngOnInit(): void {

    this.datosByFechaHoy()

  }

  // updateItem(item: Modelo) {
  //   this.db.select = Object.assign({}, item);
  //   this.db.update();
  // }

  
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


  datosByFecha() {
    const daba = getDatabase();   

    const starCountRef = ref(daba, 'UsersData/Ingresos/');
    onValue(starCountRef, (snapshot) => {
      this.items = [];
       this.entradas = {total: 0, empleados: 0, clientes: 0};
       this.salidas = {total: 0, empleados: 0, clientes: 0};
       let x;
      let data  = snapshot.forEach((element : any) => {
        x = element.val();
        let llave = element.key
        var expresionRegular = /\s*_\s*/;
        var resultado = llave.split(expresionRegular);
        
        let dateNotFormat: any  = this.fecha
        let fecha = dateNotFormat.split( /\s*-\s*/)
        this.fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];
        let datee = fecha[2] + "-" + fecha[1] + "-" + fecha[0];

        if(resultado[0] == datee)
        {
          if(x.Ingreso == 1){
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

  datosByFechaHoy() {
    const daba = getDatabase();   

    const starCountRef = ref(daba, 'UsersData/Ingresos/');
    onValue(starCountRef, (snapshot) => {
      this.items = [];
       this.entradas = {total: 0, empleados: 0, clientes: 0};
       this.salidas = {total: 0, empleados: 0, clientes: 0};
       let x;
       let date = new Date();
       let mes = date.getMonth()>10 ? (date.getMonth()+1 ): "0"+(date.getMonth()+1);
       this.fecha = date.getDate() + "-" +  mes + "-" + date.getFullYear();
      let data  = snapshot.forEach((element : any) => {
        x = element.val();
        
        let llave = element.key
        
        var expresionRegular = /\s*_\s*/;
        var resultado = llave.split(expresionRegular);

        let datee = date.getDate() + "-" + mes + "-" + date.getFullYear();
        //  let datee = 28 + "-" + mes + "-" + date.getFullYear();
        if(resultado[0] == datee)
        {
          if(x.Ingreso == 1){
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
