import { Injectable } from '@angular/core';
import { persistState, Store, StoreConfig } from '@datorama/akita';
import { User } from '../../model/user';

export interface SessionState extends User{ }

export function createInitialState(): SessionState {
  return {
    name: null,
    id: null
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState> {
  constructor() {
    super(createInitialState());
  }

}

export const sessionPersistStorage = persistState({
    include: ['session'],
    key: 'sessionStore',
});

const providers = [{ provide: 'persistStorage', useValue: sessionPersistStorage }];