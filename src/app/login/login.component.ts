import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/_services';
import { first } from 'rxjs/operators';
import {User} from '@app/_models/user';
import * as jwt_decode from 'jwt-decode';

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
              var decodedToken = jwt_decode(res.token);
              localStorage.setItem('tr_token', res.token);
              var sub = decodedToken['sub'];
              var companyid = decodedToken['companyid'];
              var user: User = {username: sub, company: companyid,
              password:'',disabled:false}
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.authService.currentUserSubject.next(user);
              this.authService.isAuthenticated.next(true);
              this.router.navigate([this.returnUrl]);
              location.reload(true);
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
