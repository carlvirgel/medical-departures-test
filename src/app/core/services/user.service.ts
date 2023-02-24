import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { UserStore } from '../state/user/user.store';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private store: UserStore) {}
  
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}` + 'users').pipe(
      tap(users => {
        this.store.loadUsers(users, true);
      })
    );
  }

}
