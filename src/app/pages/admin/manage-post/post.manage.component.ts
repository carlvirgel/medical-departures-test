import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, first, from, last, lastValueFrom, map, Observable, of, Subscription, switchMap, take, takeLast, takeWhile, tap, zip } from 'rxjs';
import { Post } from 'src/app/core/model/post';
import { User } from 'src/app/core/model/user';
import { PostService } from 'src/app/core/services/post.service';
import { SessionService } from 'src/app/core/services/session.service';
import { PostQuery } from 'src/app/core/state/post/post.query';
import { SessionQuery } from 'src/app/core/state/session/session.query';

@UntilDestroy()
@Component({
  selector: 'app-post-manage',
  templateUrl: './post.manage.component.html',
  styleUrls: ['./post.manage.component.scss']
})
export class ManagePostComponent implements OnInit {

  headers = ['ID', 'Title'];
  userInfo: any | User;
  listOfPosts!: Subscription;
  posts$: Observable<Post[]> = this.postQuery.selectAll();
  constructor(private sessionQuery: SessionQuery, private postQuery: PostQuery, private postService: PostService,
    private router: Router) {

  }
  ngOnInit() {
    this.userInfo = this.sessionQuery.getValue();
    this.listOfPosts = this.postQuery.selectAllPosts$.pipe(untilDestroyed(this), switchMap(isLoaded => {
      if (!isLoaded) {
        return this.postService.getAllIndividualPost(this.userInfo.id);
      }
      return of(undefined)
    })).subscribe();
  }

  deletePost($event: any) {
    this.postService.deletePost($event).pipe(take(1), untilDestroyed(this)).subscribe();
  }

  viewPost($event: any) {
    this.router.navigate([`post/${$event}`]);
  }

  editPost($event: any) {
    this.router.navigate([`admin/post/${$event.id}`]);
  }

  newPost() {
    this.router.navigate(['admin/post/']);
  }
}
