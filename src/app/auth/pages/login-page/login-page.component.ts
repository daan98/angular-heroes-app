import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { FormInterface } from '../../interfaces';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'auth-login-pages',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {
  
  public loginForm : FormGroup = new FormGroup({
      user: new FormControl<string>('', { nonNullable: true }),
      password: new FormControl<string>('', { nonNullable: true })
  });
  
  constructor(
    private authService : AuthService,
    private router : Router,
    private snackbar : MatSnackBar
  ) { }
    
  get formInformation() : FormInterface {
    const userCredentials : FormInterface = this.loginForm.value as FormInterface;
    return userCredentials;
  }

  public onLogin() : void {
    if (!this.formInformation.user || !this.formInformation.password) {
      this.showSnackbar('All fields are required');
      return;
    }

    this.authService.login(this.formInformation.user, this.formInformation.password).subscribe(
      (response) => {
        if(localStorage.getItem('token')) {
          this.router.navigate(['/heroes'])
          return;
        }

        this.showSnackbar('there was an error while doing the login');
      }
    );
  }

  private showSnackbar(message : string) : void {
    this.snackbar.open(message, undefined, {
      duration: 2500,
    })
  }
}
