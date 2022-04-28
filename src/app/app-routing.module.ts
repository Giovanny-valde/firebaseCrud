import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionComponent } from './funcion/funcion.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [

  { path: '', component: RegisterComponent },
  { path: 'dashboard', component:FuncionComponent , pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
