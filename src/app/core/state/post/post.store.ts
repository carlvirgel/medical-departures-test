import { Injectable } from '@angular/core';
import { EntityState, EntityStore, persistState, Store, StoreConfig } from '@datorama/akita';
import { Post } from '../../model/post';

export interface PostState extends EntityState<Post>{
  isLoaded: false
}
export function createInitialState(): PostState {
  return {
    isLoaded: false
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'posts' })
export class PostStore extends EntityStore<PostState> {
  constructor() {
    super(createInitialState());
  }

  loadPosts(posts: PostState[] | any, isLoaded: boolean) {
    this.set(posts);
    this.update((state: any) => ({
      ...state,
      isLoaded
    }));
  }

  updatePost(post: PostState | any) {
    this.update(post.id, post);
  }

}

export const sessionPostPersistStorage = persistState({
  include: ['posts'],
  key: 'postStore',
});

const providers = [{ provide: 'persistStorage', useValue: sessionPostPersistStorage }];