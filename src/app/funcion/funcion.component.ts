import { Component, OnInit } from '@angular/core';
import { getDatabase, ref,  onValue} from 'firebase/database';
import {  Firestore } from '@angular/fire/firestore';
import {  Observable } from 'rxjs';
// import { get } from 'http';

@Component({
  selector: 'app-funcion',
  templateUrl: './funcion.component.html',
  styleUrls: ['./funcion.component.css']
})
export class FuncionComponent implements OnInit {

  item$: Observable<any[]> = new Observable();
  items : any[] = [];
  constructor( db : Firestore) {  
    const col = getDatabase();
    const starCountRef = ref(col, '/as/aaasta',);
    onValue(starCountRef, (snapshot) => {
      const data : string = snapshot.val();   
      console.log(data);
        this.items.push(data);
    });
    }
  ngOnInit(): void {
    // this.item$.subscribe(data => {
    //   console.log(data);
    // });
  }

}
