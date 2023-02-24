import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, Observable, of, Subscription, switchMap } from 'rxjs';
import { User } from 'src/app/core/model/user';
import { UserService } from 'src/app/core/services/user.service';
import { UserQuery } from 'src/app/core/state/user/user.query';

@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  listUsers!: Subscription;
  user$: Observable<User[]> = this.userQuery.selectAll();

  constructor(private userQuery: UserQuery, private user: UserService) {
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
  }


}
