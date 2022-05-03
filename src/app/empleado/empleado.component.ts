import { Component, OnInit } from '@angular/core';
import { getDatabase, onValue, remove, set } from '@angular/fire/database';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ref } from 'firebase/database';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

  formEmpleado!: FormGroup;
  ClientesEnCaja = []
  Empleado : any[] = [];
  Tarjetas: any[] = [];
  constructor(dbs: Firestore, public fb: FormBuilder) { }

  ngOnInit(): void {
    const daba = getDatabase();

    //OBTENER TARJETAS
    this.ObtenerTarjeta(daba);

    //OBTENER EMPLEADOS
    this.ObtenerEmpleado(daba);


    this.crearFormulario();
  }

  public crearFormulario() {
    this.formEmpleado = this.fb.group({
      id: [''],
      direccion: [''],
      email: [''],
      nombre: [''],
      telefono: [''],
      tipoDocumento: [''],
      tarjeta: [''],
    });
  }

  public ObtenerTarjeta(daba: any) {
    const starCountRef = ref(daba, 'UsersData/Tarjetas/');
    onValue(starCountRef, (snapshot) => {
      this.Tarjetas = [];
      let x;
      let data = snapshot.forEach((element: any) => {
        x = element.val();
        console.log(x)
        let dato = {
          key: element.key,
          ...x
        };
        this.Tarjetas.push(dato);
      });
    });
  }

  public ObtenerEmpleado(daba: any) {
    const starCountRef = ref(daba, 'UsersData/Empleado/');
    onValue(starCountRef, (snapshot) => {
      this.Empleado = [];
      let x;
      let data = snapshot.forEach((element: any) => {
        x = element.val();
        let dato = {
          key: element.key,
          ...x
        };
        this.Empleado.push(dato);
      });
    });
  }

  obtener(data : any){
    console.log(data)
    this.formEmpleado.setValue({
      id: data?.key,
      direccion: data?.Direccion,
      email: data?.Email,
      nombre: data?.Nombre,
      telefono: data?.Telefono,
      tipoDocumento: data?.TipoDocumento,
      tarjeta: data?.Tarjeta,
    });
  }
    // this.formEmpleado.controls['id'].setValue(data.id);
  
  guardar(){
    let data = this.formEmpleado.value;
    const db = getDatabase();

    //AGREGAR Empleado
    set(ref(db, 'UsersData/Empleado/' + data.id), {
      Direccion: data.direccion,
      Email: data.email,
      Nombre: data.nombre,
      Tarjeta: data.tarjeta,
      Telefono: data.telefono,
      TipoDocumento: data.tipoDocumento,
    });
    this.obtener(null);
  }

  resetform(){
    this.formEmpleado;
  }

  eliminar(item: any) {
    //  console.log("remove == ",item.hora);
    const db = getDatabase();
    remove(ref(db, 'UsersData/Empleado/' + item.key));
}


}
