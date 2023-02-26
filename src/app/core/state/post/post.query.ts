import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { PostState, PostStore } from './post.store';


@Injectable({
  providedIn: 'root'
})
export class PostQuery extends QueryEntity<PostState> {

  selectAllPosts$ = this.select(state => {
    return state.isLoaded;
  });

  constructor(protected override store: PostStore) {
    super(store);
  }
}