import {
  Component,
  OnInit
} from '@angular/core';
import {
  getDatabase,
  ref
} from '@angular/fire/database';
import {
  Firestore
} from '@angular/fire/firestore';
import {
  FormBuilder
} from '@angular/forms';
import {
  onValue
} from '@firebase/database';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {


  fecha: string | null = " ";
  origen: string | null = "";
  Tarjetas: any[] = [];
  Empleado: any[] = [];
  titulo  = "";
  dabase  = getDatabase();
  constructor(dbs: Firestore, private fb: FormBuilder) {}

  ngOnInit(): void {
    // this.Tarjetas = [];
    // this.Empleado = [];

    this.fecha = localStorage.getItem("fecha");
    this.origen = localStorage.getItem("origen");
    console.log(this.origen);
    const daba = getDatabase();
    // //OBTENER EMPLEADOS 
    this.Empleados(daba)

    console.log(this.fecha);
    //OBTENER TINGRESOS
    this.ObtenerIngresos();



  }

  public ObtenerIngresos() {
    const starCountRef = ref(this.dabase, 'UsersData/Ingresos/');
    onValue(starCountRef, (snapshot) => {
      this.Empleados(this.dabase);
      this.Tarjetas = [];

      let x;
      let dateNotFormat: any = this.fecha
      let fecha = dateNotFormat.split(/\s*-\s*/)
      let data = snapshot.forEach((element: any) => {
        x = element.val();
        let llave = element.key
        var expresionRegular = /\s*_\s*/;
        var resultado = llave.split(expresionRegular);
        let datee = fecha[2] + "-" + fecha[1] + "-" + fecha[0];
        if (resultado[0] == datee) {
          // if (x.Ingreso == 0) {
            if (this.origen == "cliente") {
              this.obtenerCliente(x, resultado[0], resultado[1]);
              this.titulo = "Ingresos por Cliente";
            }
            if (this.origen == "empleado") {
              // console.log(x);
              this.obtenerEmpleado(x, resultado[0], resultado[1]);
              this.titulo = "Ingresos por Empleado";
            }
            // console.log(resultado[0]);
            // console.log(datee);
          // }
        }
      });
    });
  }


  obtenerCliente(x : any,  fecha : string , hora : string) {
    if (x.Empleado == 0) {
      let ingreso = x.Ingreso == 0 ? "SALIDA" : "INGRESO";
      let dato = {
        nombre : "",
        Ingreso : ingreso,
        Tarjeta : x.Tarjeta,
        Fecha : fecha,
        Hora : hora,
      };
      this.Tarjetas.push(dato);
    }
  }

 public obtenerEmpleado(x : any, fecha : string , hora : string) {
    // this.Tarjetas = [];
    let nombre = "";
    if (x.Empleado == 1) {
      let ingreso = x.Ingreso == 0 ? "SALIDA" : "INGRESO";
      this.Empleado.forEach(element => {
        if (element.Tarjeta == x.Tarjeta) {
          nombre = element.Nombre;
        }
        else
        {
          nombre = "";
        }
        let dato = {
          nombre : nombre,
          Ingreso : ingreso,
          Tarjeta : x.Tarjeta,
          Fecha : fecha,
          Hora : hora,
        };
        this.Tarjetas.push(dato);
      });
    }
    // console.log(this.Tarjetas);
  }

  Empleados(daba : any){
    // console.log("empleado");
    const starCountRef = ref(daba, 'UsersData/Empleado/');
    onValue(starCountRef, (snapshot) => {
      this.Empleado = [];
      let x;
      let data = snapshot.forEach((element: any) => {
        // console.log(element.val());
        x = element.val();
        let dato = {
          key: element.key,
          ...x
        };
        this.Empleado.push(dato);
        console.log(this.Empleado);
      });
    });

  }

}
