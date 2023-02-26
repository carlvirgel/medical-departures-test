import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subscription, Observable, filter, switchMap, of, tap } from 'rxjs';
import { User } from 'src/app/core/model/user';
import { SessionService } from 'src/app/core/services/session.service';
import { UserService } from 'src/app/core/services/user.service';
import { UserQuery } from 'src/app/core/state/user/user.query';

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  listUsers!: Subscription;
  user$: Observable<User[]> = this.userQuery.selectAll();
  isLoading$ = this.userQuery.selectLoading();


  constructor(private userQuery: UserQuery, private user: UserService, 
    private router: Router, private sessionService: SessionService,
    private meta: Meta, private title: Title) {
  }

  ngOnInit() {
    this.listUsers = this.userQuery.selectAllUsers$.pipe(
      untilDestroyed(this),
      filter(isLoaded => !isLoaded),
      switchMap(isLoaded => {
        if (!isLoaded) {
          return this.user.getAllUsers();
        }
        return of(undefined)
      })
    ).subscribe();
    this.meta.addTag({ name: 'description', content: 'This is a login page for medical departures test.' });
    this.meta.addTag({ name: 'title', content: 'Medical Departures | Login - A sample angular exam' });
    this.title.setTitle('Medical Departures | Login ');
  }


  getBGColors() {
    return of('#' + Math.floor(Math.random() * 16777215).toString(16));
  }

  onClickLogin(user: User) {
    this.sessionService.login(user).pipe(untilDestroyed(this), (tap(data => {
      this.router.navigate(['admin'])
    }))).subscribe();
  }

}