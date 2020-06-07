import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import {User} from '@app/_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Grace Transport Solutions';
  isAuthenticated: boolean;
  user: User;

  constructor(public authService: AuthService,
              private titleService: Title,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.authService.isAuthenticated.subscribe(
      (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    );
    this.user = this.authService.currentUserValue;
  }

  setDocTitle(title: string) {
    this.titleService.setTitle(title);
  }

  async ngOnInit() {
    this.isAuthenticated = await this.authService.checkAuthenticated();
    this.title = this.titleService.getTitle();


    this.router
      .events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        const child = this.activatedRoute.firstChild;
        if (child.snapshot.data['title']) {
          return child.snapshot.data['title'];
        }
        return this.title;
      })
    ).subscribe((ttl: string) => {
      this.titleService.setTitle(ttl);
      this.title = this.titleService.getTitle();
    });
  }

  logout() {
    this.authService.logout('/login');
  }
}
