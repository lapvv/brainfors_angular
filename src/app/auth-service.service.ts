import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afs: AngularFireAuth) {}

  register(email: string, password: string) {
    return this.afs.createUserWithEmailAndPassword(email, password);
  }

  signIn(email: string, password: string) {
    return this.afs.signInWithEmailAndPassword(email, password);
  }
}
