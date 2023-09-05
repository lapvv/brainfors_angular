import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private email = '';
  private password = '';

  constructor(private afs: AngularFireAuth) {}

  register(email: string, password: string) {
    return this.afs.createUserWithEmailAndPassword(email, password);
  }

  signIn(email: string, password: string) {
    return this.afs.signInWithEmailAndPassword(email, password);
  }

  getEmail(): string {
    return this.email;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  getPassword(): string {
    return this.password;
  }

  setPassword(password: string): void {
    this.password = password;
  }
}
