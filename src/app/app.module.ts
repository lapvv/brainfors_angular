import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth-service.service';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SharedService } from './shared.service';

const firebaseConfig = {
  apiKey: 'AIzaSyBChlV-JoMh6deDp6hdkmC8NoyVDGqwlgY',
  authDomain: 'brainfors-angular.firebaseapp.com',
  projectId: 'brainfors-angular',
  storageBucket: 'brainfors-angular.appspot.com',
  messagingSenderId: '480465999187',
  appId: '1:480465999187:web:2210154e82dfdda8447da6',
};

@NgModule({
  declarations: [AppComponent, MainPageComponent, LoginPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    AngularFireAuthModule,
  ],
  providers: [SharedService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
