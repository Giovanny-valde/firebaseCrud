import { Component, OnInit } from '@angular/core';
import { getDatabase, onValue, ref, remove, set } from '@angular/fire/database';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit {

  formTarjeta!: FormGroup;
  Tarjeta : any[] = [];
  constructor(dbs: Firestore, public fb: FormBuilder) { }

  ngOnInit(): void {
    const daba = getDatabase();

    //OBTENER TARJETA
    this.ObtenerTarjeta(daba);


    this.crearFormulario();
  }

  public crearFormulario() {
    this.formTarjeta = this.fb.group({
      tarjeta: ['' ,[Validators.required]],
      crono : ['' ,[Validators.required] ],
      empleado : ['' ,[Validators.required]],
      fraccionTiempo : ['' ,[Validators.required]],
      ingreso : ['' ,[Validators.required]],

    });
  }

  public ObtenerTarjeta(daba: any) {
    const starCountRef = ref(daba, 'UsersData/Tarjetas/');
    onValue(starCountRef, (snapshot) => {
      this.Tarjeta = [];
      let x;
      let data = snapshot.forEach((element: any) => {
        x = element.val();
        // console.log(x);
        let dato = {
          key: element.key,
          ...x
        };
        // console.log(dato);
        this.Tarjeta.push(dato);
      });
    });
  }

  obtener(data : any){
    // console.log(data)
    this.formTarjeta.setValue({
      tarjeta : data.key,
      crono : data.Crono,
      empleado : data.Empleado,
      fraccionTiempo : data.FraccionTiempo,
      ingreso : data.Ingreso,
    });
  }
  
  guardar(){
    let data = this.formTarjeta.value;
    const db = getDatabase();

    //AGREGAR Empleado
    set(ref(db, 'UsersData/Tarjetas/' + data.tarjeta), {
      Crono : data.crono,
      Empleado : data.empleado,
      FraccionTiempo : data.fraccionTiempo,
      Id : data.tarjeta,
      Ingreso : data.ingreso,

    });
  }

  eliminar(item: any) {
    //  console.log("remove == ",item.hora);
    const db = getDatabase();
    remove(ref(db, 'UsersData/Tarjetas/' + item.key));
}
}
