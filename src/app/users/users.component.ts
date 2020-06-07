import { Observable } from "rxjs";
import { UserService } from '@app/_services';
import { User } from '@app/_models';
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  users: Observable<User[]>;

  constructor(private userService: UserService,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.users = this.userService.getAll();
  }

  disableEnableUser(username: string,activate: boolean){
    console.log(" disableEnableUser "+username+";disable:"+activate)
    var user: Object = {'username': username, 'disabled': activate};
    this.userService.disableUser(user).subscribe(
      data => {
        this.reloadData();
      },
      error => console.log(error));
  }


  /*companyDetails(id: number){
    this.router.navigate(['details', id]);
  }

  updateCompany(id: number){
    this.router.navigate(['update', id]);
  }*/
}
