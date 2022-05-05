import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionComponent } from './funcion/funcion.component';
import { RegisterComponent } from './register/register.component';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { EmpleadoComponent } from './empleado/empleado.component';
import { ClienteComponent } from './cliente/cliente.component';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { HistorialComponent } from './historial/historial.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['dashboard']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
    ...canActivate(redirectLoggedInToHome),
  },
  { path: 'registro', component: RegisterComponent
  , ...canActivate(redirectUnauthorizedToLogin), 
  },
  { 
    path: 'dashboard', component:FuncionComponent , pathMatch: 'full' ,
    ...canActivate(redirectUnauthorizedToLogin)
  },
  { path:"empleado", component:EmpleadoComponent,
    ...canActivate(redirectUnauthorizedToLogin)},
  { path:"cliente", component:ClienteComponent,
    ...canActivate(redirectUnauthorizedToLogin)},
  { path: 'tarjeta', component: TarjetaComponent,
    ...canActivate(redirectUnauthorizedToLogin)},
  { path: 'historial', component: HistorialComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
