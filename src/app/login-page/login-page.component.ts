import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  formGroup: FormGroup;
  invalid = false;
  isSignIn = true;
  error!: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      email: this.formBuilder.control(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      password: this.formBuilder.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('[^а-яА-Я]*'),
        ])
      ),
    });
  }

  ngOnInit() {}

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
        control.updateValueAndValidity({ onlySelf: true });
      } else if (control instanceof FormArray) {
        control.controls.forEach((ctrl) => {
          ctrl.markAsTouched({ onlySelf: true });
          ctrl.markAsDirty({ onlySelf: true });
          ctrl.updateValueAndValidity({ onlySelf: true });
        });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onSubmit(): void {
    this.validateAllFormFields(this.formGroup);
    if (this.formGroup.valid) {
      this.invalid = false;
      if (this.isSignIn) {
        this.authService
          .signIn(this.formGroup.value.email, this.formGroup.value.password)
          .then((res) => {
            this.formGroup.patchValue({ email: '', password: '' });
            this.router.navigateByUrl('/main');
          })
          .catch((err) => {
            console.log(err.message);
            this.error = err.message;
          });
      } else {
        this.authService
          .register(this.formGroup.value.email, this.formGroup.value.password)
          .then((res) => {
            this.formGroup.patchValue({ email: '', password: '' });
          })
          .catch((err) => {
            console.log(err.message);
            this.error = err.message;
          });
      }
    } else {
      this.invalid = true;
    }
  }

  switch(): void {
    this.isSignIn = !this.isSignIn;
  }
}
