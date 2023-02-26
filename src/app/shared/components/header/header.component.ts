import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionQuery } from 'src/app/core/state/session/session.query';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  userLoggedIn = this.sessionQuery.userLogin;

  constructor(public router: Router, private sessionQuery: SessionQuery) {}
}
