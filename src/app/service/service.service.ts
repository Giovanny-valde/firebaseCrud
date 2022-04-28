import { Injectable } from '@angular/core';
import { getDatabase, onValue, ref } from 'firebase/database';
// import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Modelo } from '../modelo/modelo';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  starCountRef  : any;
  select = new Modelo();
  
  constructor(
    
  ) { 
    const db = getDatabase();
    this.starCountRef = ref(   db, 'as/aaasta');
    // onValue(starCountRef, (snapshot) => {
    //   let data = snapshot.exportVal();
    //   });
  }

  // getProducts()
  // {
  //   return this.starCountRef  ;
  // }

  update() {
    console.log("update == ",this.select);
    // this.starCountRef.child(item.hora).set(item);
  }


}

