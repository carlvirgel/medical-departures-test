import { state } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Post } from '../model/post';
import { PostPublicStore } from '../state/post-public/post.public.store';
import { PostQuery } from '../state/post/post.query';
import { PostStore } from '../state/post/post.store';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private store: PostStore, private publicStore: PostPublicStore,
    private postQuery: PostQuery) {}
  
  getAllIndividualPost(userId: any): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiUrl}` + 'posts?userId=' + userId).pipe(
      tap(post => {
        this.store.loadPosts(post, true);
      })
    );
  }

  getAllPublicPost(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiUrl}` + 'posts').pipe(
      tap(post => {
        this.publicStore.loadPosts(post, true);
      })
    );
  }

  deletePost(postId: any): Observable<any> {
    return this.http.delete(`${environment.apiUrl}` + 'posts/' + postId).pipe(
      tap(() => {
        this.store.remove(postId);
        this.publicStore.remove(postId);
      })
    );
  }

  updatePost(post: Post) {
    return this.http.put(`${environment.apiUrl}` + 'posts/' + post.id, {
      body: JSON.stringify(post)
    }).pipe(
      tap(() => {
        this.store.updatePost(post);
        this.publicStore.updatePost(post);
      })
    );
  }

  addPost(post: Post) {
    return this.http.post(`${environment.apiUrl}` + 'posts', {
      body: post
    }).pipe(
      tap((data: any) => {
        data.id = data.id + Math.floor(Math.random() * 50 * 101);
        const post: Post = {
          id: data.id,
          ...data.body
        }
        this.store.add(post);
        this.publicStore.add(post);
      })
    );
  }

}
