import { Component, OnInit } from '@angular/core';
import { getDatabase,  ref, onValue, remove} from 'firebase/database';
import {  Firestore } from '@angular/fire/firestore';
import {  Observable } from 'rxjs';
import { ServiceService } from '../service/service.service';
import { Modelo } from '../modelo/modelo';
// import { get } from 'http';

@Component({
  selector: 'app-funcion',
  templateUrl: './funcion.component.html',
  styleUrls: ['./funcion.component.css']
})
export class FuncionComponent implements OnInit {

  item$: Observable<any[]> = new Observable();
  items : any[] = [];
  constructor( dbs : Firestore , public  db : ServiceService) {

  }
  
  ngOnInit(): void {

    const daba = getDatabase();   

    const starCountRef = ref(daba, 'UsersData/LCKSCzPK0TRN1LrXx8V28iQdJYz1/');
    onValue(starCountRef, (snapshot) => {
      // console.log(snapshot.val())s;
      this.items = [];
      let data  = snapshot.forEach((element : any) => {
        let x = element.val();
        console.log(x);
        x["id"] = element.key;
        
        console.log(x);
        this.items.push(x as any);
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
