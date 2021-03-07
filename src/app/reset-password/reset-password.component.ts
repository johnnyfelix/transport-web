import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/_services';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  username: string;
  password: string;
  error: boolean;
  success: boolean;
  form: FormGroup;
  control: FormControl;
  message: string;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.error = false;
    this.success = false;
    this.control = this.fb.control("", Validators.required);
    this.form = this.fb.group({
      password: ['', Validators.required],
      username: ['']
    });
    this.message = "";
    this.username = this.route.snapshot.params['username'];
  }

  update(user: Object) {
    this.userService.resetPassword(user)
      .subscribe(
        data => {
          console.log(data);
          this.success = true;
          this.message = "Password reset Successfully";
        },
        error => {
          this.message = error;
          this.error = true;
        });

  }

  onSubmit() {
    if (this.form.valid) {
      var user: Object = {'username': this.username, 'password': this.password}
      this.update(user);
    }

  }

  gotoUsers() {
    this.router.navigate(['/users']);
  }

}
