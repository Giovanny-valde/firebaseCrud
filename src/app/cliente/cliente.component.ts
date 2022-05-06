import { Component, OnInit } from '@angular/core';
import { getDatabase, onValue, ref, remove, set } from '@angular/fire/database';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  formCliente!: FormGroup;
  Clientes : any[] = [];
  constructor(dbs: Firestore, public fb: FormBuilder) { }

  ngOnInit(): void {
    const daba = getDatabase();

    //OBTENER CLIENTES
    this.ObtenerCliente(daba);


    this.crearFormulario();
  }

  public crearFormulario() {
    this.formCliente = this.fb.group({
      id: ['' , Validators.required],
      direccion: ['' , Validators.required],
      email: ['' , Validators.required],
      nombre: ['' , Validators.required],
      telefono: ['' , Validators.required], 
      tipoDocumento: ['' , Validators.required],
    });
  }


  public ObtenerCliente(daba: any) {
    const starCountRef = ref(daba, 'UsersData/Clientes/');
    onValue(starCountRef, (snapshot) => {
      this.Clientes = [];
      let x;
      let data = snapshot.forEach((element: any) => {
        x = element.val();
        console.log(x);
        let dato = {
          key: element.key,
          ...x
        };
        this.Clientes.push(dato);
      });
    });
  }

  obtener(data : any){
    console.log(data)
    this.formCliente.setValue({
      id: data.key,
      direccion: data.Direccion,
      email: data.Email,
      nombre: data.Nombre,
      telefono: data.Telefono,
      tipoDocumento: data.TipoDocumento,
    });
  }
  
  guardar(){
    let data = this.formCliente.value;
    const db = getDatabase();

    //AGREGAR Empleado
    set(ref(db, 'UsersData/Clientes/' + data.id), {
      Direccion: data.direccion,
      Email: data.email,
      Nombre: data.nombre,
      Telefono: data.telefono,
      TipoDocumento: data.tipoDocumento,
    });
  }

  eliminar(item: any) {
    //  console.log("remove == ",item.hora);
    const db = getDatabase();
    remove(ref(db, 'UsersData/Clientes/' + item.key));
}

}
