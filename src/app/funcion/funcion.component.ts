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
  total = 0;
  empleados = 0;
  clientes = 0;
  constructor( dbs : Firestore , public  db : ServiceService) {

  }
  
  ngOnInit(): void {

    const daba = getDatabase();   

    const starCountRef = ref(daba, 'UsersData/Ingresos/');
    onValue(starCountRef, (snapshot) => {
      // console.log(snapshot.val())s;
      this.items = [];
      let x;
       this.total = 0;
       this.empleados = 0;
       this.clientes = 0;
      let data  = snapshot.forEach((element : any) => {
        // console.log(element.val());
        x = element.val();
        
        let llave = element.key

        var expresionRegular = /\s*_\s*/;
        var resultado = llave.split(expresionRegular);
        // console.log(resultado[0]);
        let date = new Date();
        let mes = date.getMonth()>10 ? (date.getMonth()+1 ): "0"+(date.getMonth()+1);
        // console.log("fecha---");
        // let datee = date.getDate() + "-" + mes + "-" + date.getFullYear();
         let datee = 20 + "-" + mes + "-" + date.getFullYear();
        // console.log(fecha);

        // console.log(llave);
        if(resultado[0] == datee)
        {
          this.total++;
          x.Empleado == 1 ? this.empleados++ : this.clientes++; 
          console.log(x);
          this.items.push(x);
        }

      });
      
      console.log("total",this.total);
      console.log("empleados",this.empleados);
      console.log("clientes",this.clientes);
     
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
