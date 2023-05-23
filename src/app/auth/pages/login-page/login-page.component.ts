import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { ValidatorService } from '../../../shared/services/validator.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  public spotifyLogo: string = 'assets/images/spotify_icon.svg';

  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)]],
    password: ['', [Validators.required]]
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private validatorService: ValidatorService,
  ) { }


  public login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    };

    this.authService.authSpotify();
  }

  public isValidField(field: string) {
    return this.loginForm.controls[field].errors && this.loginForm.controls[field].touched;
  }

}
