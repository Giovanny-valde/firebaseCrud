import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  provideDatabase } from '@angular/fire/database';
import { initializeApp, getApp , provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { FuncionComponent } from './funcion/funcion.component';
// import { DatabaseModule } from '@angular/fire/database';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { provideFirestore } from '@angular/fire/firestore';
import { UnitFuncionComponent } from './funcion/unit-funcion/unit-funcion.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    FuncionComponent,
    UnitFuncionComponent
  ],
  imports: [
    BrowserModule,  
    AppRoutingModule,
    // DatabaseModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
