import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, tap } from 'rxjs';
import { createInitialState, SessionStore } from '../state/session/session.store';
import { User } from '../model/user';
import { SessionQuery } from '../state/session/session.query';
import { PostStore } from '../state/post/post.store';

@Injectable({ providedIn: 'root' })
export class SessionService {
  
  constructor(private sessionStore: SessionStore, private sessionQuery: SessionQuery,
    private postStore: PostStore) {}

  /** No Authentication yet so just set directly the user session */
  login(user: User) {
    if (user) {
      this.sessionStore.update(user);
    } else {
      this.sessionStore.update(user);
    }
    return of(user);
  }

  logout() {
    this.sessionStore.update(createInitialState());
    this.postStore.updateIsload(false);
  }


}