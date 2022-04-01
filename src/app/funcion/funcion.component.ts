import { Component, OnInit } from '@angular/core';
import { getDatabase,  ref, onValue} from 'firebase/database';
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

    const starCountRef = ref(daba, 'as/aaasta');
    onValue(starCountRef, (snapshot) => {
      this.items = [];
      let data  = snapshot.forEach((element : any) => {
        let x = element.val();
        x["hora"] = element.key;
        this.items.push(x as Modelo);
      });
    });

  }

  updateItem(item: Modelo) {
    this.db.select = Object.assign({}, item);
    this.db.update();
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
