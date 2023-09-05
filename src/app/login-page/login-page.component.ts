import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  formGroup: FormGroup;
  invalid = false;

  constructor(
    private formBuilder: FormBuilder,
    private userDataService: AuthService,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      email: this.formBuilder.control(
        this.userDataService.getEmail(),
        Validators.compose([Validators.required, Validators.email])
      ),
      password: this.formBuilder.control(
        this.userDataService.getPassword(),
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
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
    console.log(this.formGroup.value.email);
    console.log(this.formGroup.value.password);
    this.validateAllFormFields(this.formGroup);
    this.userDataService.setEmail(this.formGroup.value.email);
    this.userDataService.setPassword(this.formGroup.value.password);
    console.log(this.formGroup.valid);
    if (this.formGroup.valid) {
      this.router.navigate(['/main']);
      this.router.navigateByUrl('/main');
    } else {
      this.invalid = true;
    }
  }
}
