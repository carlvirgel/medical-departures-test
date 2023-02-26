import { Injectable } from '@angular/core';
import { EntityState, EntityStore, persistState, Store, StoreConfig } from '@datorama/akita';
import { Post } from '../../model/post';

export interface PostPublicState extends EntityState<Post>{
  isLoaded: false
}
export function createInitialState(): PostPublicState {
  return {
    isLoaded: false
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'posts-public' })
export class PostPublicStore extends EntityStore<PostPublicState> {
  constructor() {
    super(createInitialState());
  }

  loadPosts(posts: PostPublicState[] | any, isLoaded: boolean) {
    this.set(posts);
    this.update((state: any) => ({
      ...state,
      isLoaded
    }));
  }

  updatePost(post: PostPublicState | any) {
    this.update(post.id, JSON.parse(JSON.stringify(post)));
  }

}

export const sessionPersistStorage = persistState({
  include: ['posts-public'],
  key: 'sessionStore',
});

const providers = [{ provide: 'persistStorage', useValue: sessionPersistStorage }];