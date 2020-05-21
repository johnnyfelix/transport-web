import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GranceTrans';
  isAuthenticated: boolean;

  constructor(public authService: AuthService) {
    this.authService.isAuthenticated.subscribe(
      (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    );
  }

  async ngOnInit() {
    this.isAuthenticated = await this.authService.checkAuthenticated();
  }

  logout() {
    this.authService.logout('/login');
  }
}
