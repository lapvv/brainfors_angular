import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {SharedService} from "./shared.service";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

const firebaseConfig = {
  apiKey: "AIzaSyBChlV-JoMh6deDp6hdkmC8NoyVDGqwlgY",
  authDomain: "brainfors-angular.firebaseapp.com",
  projectId: "brainfors-angular",
  storageBucket: "brainfors-angular.appspot.com",
  messagingSenderId: "480465999187",
  appId: "1:480465999187:web:2210154e82dfdda8447da6"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
