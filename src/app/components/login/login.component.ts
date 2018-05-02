import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<LoginComponent>, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  login() {
    this.dialogRef.close(this.loginForm.value);
  }

  hasError(field: string, error: string): boolean {
    let control: FormControl = this.loginForm.controls[field] as FormControl;
    return control.touched && control.errors && control.errors[error];
  }
}
