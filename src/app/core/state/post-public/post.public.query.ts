import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { PostPublicState, PostPublicStore } from './post.public.store';


@Injectable({
  providedIn: 'root'
})
export class PostPublicQuery extends QueryEntity<PostPublicState> {

  selectAllPosts$ = this.select(state => {
    return state.isLoaded;
  });

  constructor(protected override store: PostPublicStore) {
    super(store);
  }
}