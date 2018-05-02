import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<SignupComponent>, private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required]
    }, {
        validator: (form) => {
          if (form.controls.password.value === form.controls.passwordRepeat.value) {
            return null;
          }
          return { 'passwordsMatch': true };
        }
      });
  }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  signup() {
    if (this.signupForm.valid)
      this.dialogRef.close(this.signupForm.value);
  }

  hasError(field: string, error: string): boolean {
    let control: FormControl = this.signupForm.controls[field] as FormControl;
    return control.touched && control.errors && control.errors[error];
  }

  hasFormError(error: string): boolean {
    return this.signupForm.errors!=null && this.signupForm.errors[error]!=null;
  }

}
