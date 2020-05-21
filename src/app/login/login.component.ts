import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/_services';
import { first } from 'rxjs/operators';
import {User} from '@app/_models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
  }

  async ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (await this.authService.checkAuthenticated()) {
      await this.router.navigate([this.returnUrl]);
    }
  }

  async onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
        const username = this.form.get('username').value;
        const password = this.form.get('password').value;
        this.authService.login(username, password).pipe(first())
          .subscribe(
            res => {
              // store user details and jwt token in local storage to keep user logged in between page refreshes

              localStorage.setItem('token', res.token);
              var user: User = {id:-1,password:'', token:'', username:'johnnyfelix',
                'firstName':'Felix',lastName:'Xavier'}
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.authService.currentUserSubject.next(user);
              this.authService.isAuthenticated.next(true);
              this.router.navigate([this.returnUrl]);
            },
            error => {
              console.log("Login error "+error)
              this.authService.currentUserSubject.next(null);
              this.authService.isAuthenticated.next(false);
              this.loginInvalid = true;
            });
    } else {
      this.formSubmitAttempt = true;
    }
  }
}
