import { Injectable } from '@angular/core';
import { EntityState, EntityStore, Store, StoreConfig } from '@datorama/akita';
import { User } from '../../model/user';

export interface UserState extends EntityState<User>{
  isLoaded: false
}
export function createInitialState(): UserState {
  return {
    isLoaded: false
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'users' })
export class UserStore extends EntityStore<UserState> {
  constructor() {
    super(createInitialState());
  }

  loadUsers(users: UserState[] | any, isLoaded: boolean) {
    this.set(users);
    this.update((state: any) => ({
      ...state,
      isLoaded
    }));
  }

}