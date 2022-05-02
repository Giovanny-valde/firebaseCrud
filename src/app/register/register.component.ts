import {
  Component,
  OnInit
} from '@angular/core';
import {
  Firestore
} from '@angular/fire/firestore';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import {
  getDatabase,
  onValue,
  ref,
  set
} from 'firebase/database';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  Tarjetas: any[] = [];
  Clientes: any[] = [];
  Caja: any[] = [];
  ClientesEnCaja: any[] = [];

  formCliente!: FormGroup;
  constructor(dbs: Firestore, public fb: FormBuilder , private authService: AuthService, private router: Router) {}

  ngOnInit(): void {

    this.crearFormulario();
    const daba = getDatabase();

    //OBTENER TARJETAS
    this.ObtenerTarjeta(daba);

    //OBTENER CLIENTES
    this.ObtenerClientes(daba);

    //OBTENER CAJA
    this.ObtenerCaja(daba);

  }


  public ObtenerTarjeta(daba: any) {
    const starCountRef = ref(daba, 'UsersData/Tarjetas/');
    onValue(starCountRef, (snapshot) => {
      this.Tarjetas = [];
      let x;
      let data = snapshot.forEach((element: any) => {
        x = element.val();
        let dato = {
          key: element.key,
          ...x
        };
        this.Tarjetas.push(dato);
      });

      console.log("TARJETAS")
      console.log(this.Tarjetas)
    });
  }

  public ObtenerClientes(daba: any) {

    const starCountRef2 = ref(daba, 'UsersData/Clientes/');
    onValue(starCountRef2, (snapshot) => {
      this.Clientes = [];
      let data = snapshot.forEach((element: any) => {
        let x = element.val();
        let dato = {
          key: element.key,
          ...x
        };
        this.Clientes.push(dato);
      });
      console.log("CLIENTES")
      console.log(this.Clientes)
      this.ObtenerClienteDeCaja();
    });

  }

  public ObtenerCaja(daba: any) {
    const starCountRef = ref(daba, 'UsersData/Caja/');
    onValue(starCountRef, (snapshot) => {
      this.Caja = [];
      let x;
      let data = snapshot.forEach((element: any) => {
        // console.log(element.val())
        x = element.val();
        let dato = {
          key: element.key,
          ...x
        };
        this.Caja.push(dato);
      });
      console.log("CAJA")
      console.log(this.Caja)
      this.ObtenerClienteDeCaja();
    });
  }

  public ObtenerClienteDeCaja() {
    this.ClientesEnCaja = [];
    for (let i = 0; i < this.Caja.length; i++) {
      for (let j = 0; j < this.Clientes.length; j++) {
        if (this.Caja[i].Cliente == this.Clientes[j].key) {
          this.ClientesEnCaja.push({
            fraccionTiempo : this.Caja[i].FraccionTiempo,
            fecha: this.Caja[i].key,
            tarjeta: this.Caja[i].Tarjeta,
            ...this.Clientes[j]
          });
        }
      }
    }
    console.log(this.ClientesEnCaja)
  }

  public guardar() {
    let data = this.formCliente.value;
    const db = getDatabase();

    //AGREGAR CLIENTE
    set(ref(db, 'UsersData/Clientes/' + data.id), {
      Direccion: data.direccion,
      Email: data.email,
      FechaNacimiento: data.fechaNacimiento,
      Nombre: data.nombre,
      Telefono: data.telefono,
      TipoDocumento: data.tipoDocumento,
    });

    //AGREGAR CAJA
    let date = this.ObtenerFecha();
    set(ref(db, 'UsersData/Caja/' + date), {
      Cliente: data.id,
      FraccionTiempo: "1",
      Tarjeta: data.tarjeta,
    })

    //CAMBIAR ESTADO DE TARJETA
    //
    set(ref(db, 'UsersData/Tarjetas/' + data.tarjeta), {
      Crono : "1",
      Empleado: "0",
      FraccionTiempo: data.fraccionTiempo,
      Id : data.tarjeta,
      Ingreso : "0",
    })

    this.formCliente.reset();

  }

  public ObtenerFecha() {
    let date = new Date();
    console.log(date)
    let mes = date.getMonth() > 10 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1);
    let hour = date.getHours() > 10 ? (date.getHours()) : "0" + (date.getHours());
    let min = date.getMinutes() > 10 ? (date.getMinutes()) : "0" + (date.getMinutes());
    let sec = date.getSeconds() > 10 ? (date.getSeconds()) : "0" + (date.getSeconds());
    let datee = date.getDate() + "-" + mes + "-" + date.getFullYear() + "_" + hour + ":" + min + ":" + sec;
    return datee;
  }

  public crearFormulario() {
    this.formCliente = this.fb.group({
      id: [''],
      direccion: [''],
      email: [''],
      fechaNacimiento: [''],
      nombre: [''],
      telefono: [''],
      tipoDocumento: [''],
      tarjeta: [''],
      fraccionTiempo : [''],
    });
  }

  buscar() {
    let id = this.formCliente.controls["id"].value
    let daba = getDatabase();
    const starCountRef2 = ref(daba, 'UsersData/Clientes/');
    onValue(starCountRef2, (snapshot) => {
      let data = snapshot.forEach((element: any) => {
        let x = element.key;
        if (x == id) {
          // this.formCliente.se
          // console.log(element.val())
          // this.formCliente.controls["tarjeta"].setValue(element.val().Tarjeta);
          this.formCliente.controls["direccion"].setValue(element.val().Direccion);
          this.formCliente.controls["email"].setValue(element.val().Email);
          this.formCliente.controls["fechaNacimiento"].setValue(element.val().FechaNacimiento);
          this.formCliente.controls["nombre"].setValue(element.val().Nombre);
          this.formCliente.controls["telefono"].setValue(element.val().Telefono);
          this.formCliente.controls["tipoDocumento"].setValue(element.val().TipoDocumento);
        }
      });
    });
  }



  logout() {
    this.authService
      .logout()
      .then(() => this.router.navigate(['/']))
      .catch((e) => console.log(e.message));
  }

}
