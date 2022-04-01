import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionComponent } from './funcion/funcion.component';

const routes: Routes = [
  { path: '', component:FuncionComponent , pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
