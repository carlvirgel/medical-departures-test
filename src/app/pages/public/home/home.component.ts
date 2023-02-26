import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Route, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { Post } from 'src/app/core/model/post';
import { PostService } from 'src/app/core/services/post.service';
import { PostPublicQuery } from 'src/app/core/state/post-public/post.public.query';

@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  listOfPosts!: Subscription;
  posts$: Observable<Post[]> = this.postPublicQuery.selectAll();
  isLoading$ = this.postPublicQuery.selectLoading();

  constructor(private postPublicQuery: PostPublicQuery, private postService: PostService,
    private router: Router,  private meta: Meta, private title: Title) {
  }

  ngOnInit() {
    this.listOfPosts = this.postPublicQuery.selectAllPosts$.pipe(
      untilDestroyed(this),
      filter(isLoaded => !isLoaded),
      switchMap(isLoaded => {
        if (!isLoaded) {
          return this.postService.getAllPublicPost();
        }
        return of(undefined)
      })
    ).subscribe();
    this.meta.addTag({ name: 'description', content: 'This is a sample exam for medical departures' });
    this.meta.addTag({ name: 'title', content: 'Medical Departures | Home - A sample angular exam' });
    this.title.setTitle('Medical Departures | Home ');
    
  }

  onClickPost(post: Post) {
     this.router.navigate([`post/${post.id}`]);
  }

}
