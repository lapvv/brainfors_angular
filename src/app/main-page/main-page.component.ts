import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, signOut } from 'firebase/auth';
import { Observable } from 'rxjs';

import { SharedService } from '../shared.service';
import { User } from '../types';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  isCreate = true;
  userId: number | undefined = undefined;
  users: Observable<any>;
  submitted = false;
  userForm;
  auth = getAuth();

  constructor(
    private service: SharedService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.users = this.service.getUsers();
    this.userForm = this.fb.group({
      name: this.fb.control(''),
      age: this.fb.control(0),
      occupation: this.fb.control(''),
    });

    console.log('auth :', this.auth);
  }

  // onAuthStateChanged(this.auth, user) {
  //   if (user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/auth.user
  //     const uid = user.uid;
  //     // ...
  //   } else {
  //     // User is signed out
  //     // ...
  //   }
  // };

  addUser(user: User) {
    this.service
      .addUser(user)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  editUser(id: number, user: FormGroup) {
    this.service
      .editUser(id, user.value)
      .then((res) => console.log('Updated ', res))
      .catch((err) => console.log(err));
  }

  deleteUser(id: number) {
    this.service
      .deleteUser(id)
      .then(() => console.log('User deleted ', id))
      .catch((err) => console.log(err));
  }

  onSubmit(user: any) {
    this.submitted = true;
    if (this.isCreate) {
      this.addUser(user.value);
    } else {
      this.editUser(this.userId!, user);
    }
  }

  switch(): void {
    this.isCreate = true;
    this.userForm.patchValue({ name: '', age: null, occupation: '' });
  }

  setUserId(id: number, user: User): void {
    this.isCreate = false;
    this.userId = id;
    this.userForm.patchValue({
      name: user.name,
      age: user.age,
      occupation: user.occupation,
    });
  }

  signOut(): void {
    signOut(this.auth)
      .then(() => {
        // Sign-out successful.
        console.log('Sign-out successful :');
        this.router.navigateByUrl('/');
      })
      .catch((error) => {
        // An error happened.
        console.log(' :', error);
      });
  }
}
