import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  provideDatabase } from '@angular/fire/database';
import { initializeApp, getApp , provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { FuncionComponent } from './funcion/funcion.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';// import { DatabaseModule } from '@angular/fire/database';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { provideFirestore } from '@angular/fire/firestore';
import { UnitFuncionComponent } from './funcion/unit-funcion/unit-funcion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { EmpleadoComponent } from './empleado/empleado.component';
import { ClienteComponent } from './cliente/cliente.component';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { MenuComponent } from './menu/menu.component';
import { HistorialComponent } from './historial/historial.component';
@NgModule({
  declarations: [
    AppComponent,
    FuncionComponent,
    UnitFuncionComponent,
    RegisterComponent,
    EmpleadoComponent,
    ClienteComponent,
    TarjetaComponent,
    MenuComponent,
    HistorialComponent,
  ],
  imports: [
    BrowserModule,  
    AppRoutingModule,
    ReactiveFormsModule,
    // DatabaseModule,we
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
