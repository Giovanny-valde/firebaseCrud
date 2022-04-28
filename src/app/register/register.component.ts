import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  Tarjetas  : any[] = [] ;

  formCliente! : FormGroup;
  constructor( dbs : Firestore , public  db : ServiceService ,public fb : FormBuilder) {
  }

  ngOnInit(): void {
    
    this.crearFormulario();
    const daba = getDatabase();   
    
    //OBTENER TARJETAS
    this.ObtenerTarjeta(daba);
    
    //OBTENER CLIENTES
    this.ObtenerClientes(daba);
 
  }


  public ObtenerTarjeta( daba : any){
    const starCountRef = ref(daba, 'UsersData/Tarjetas/');
    onValue(starCountRef, (snapshot) => {
      this.Tarjetas = [];
      let x;
      let data  = snapshot.forEach((element : any) => {
        x = element.val();
        console.log(x);
        this.Tarjetas.push(x.Id);
      });
    });
  }

  public ObtenerClientes( daba : any){
    const starCountRef2 = ref(daba, 'UsersData/Clientes/');
    onValue(starCountRef2, (snapshot) => {
      let data  = snapshot.forEach((element : any) => {
        let x = element.val();
        console.log(x);
      }
      );
    });
  }
      


  public guardar(){ 
    let data = this.formCliente.value;
    const db = getDatabase();

     //AGREGAR CLIENTE
    set(ref(db, 'UsersData/Clientes/' +data.id), {
      Direccion :  data.direccion,
      Email : data.email,
      FechaNacimiento : data.fechaNacimiento,
      Nombre : data.nombre,
      Telefono : data.telefono,
      TipoDocumento : data.tipoDocumento,
    });

    //AGREGAR TARJETA
    let date = this.ObtenerFecha();
    set(ref(db,'UsersData/Caja/' +date),{
      Cliente: data.id,
      FraccionTiempo: data.fraccion,
      Tarjeta : data.tarjeta,
    })

    this.formCliente.reset();
  }

  public ObtenerFecha(){
    let date = new Date();
    console.log(date)
    let mes = date.getMonth()>10 ? (date.getMonth()+1 ): "0"+(date.getMonth()+1);
    let hour = date.getHours()>10 ? (date.getHours() ): "0"+(date.getHours()+1);
    let min = date.getMinutes()>10 ? (date.getMinutes() ): "0"+(date.getMinutes()+1);
    let sec = date.getSeconds()>10 ? (date.getSeconds() ): "0"+(date.getSeconds()+1);
    let datee = date.getDate() + "-" + mes + "-" + date.getFullYear() + "_"+ hour + ":" + min + ":" + sec;
    return datee;
  }

  public crearFormulario(){
    this.formCliente = this.fb.group({
      id : [''],
      direccion : [''],
      email : [''],
      fechaNacimiento : [''],
      nombre: [''],
      telefono : [''],
      tipoDocumento : [''],
      tarjeta : ['']
    });
  }

}
