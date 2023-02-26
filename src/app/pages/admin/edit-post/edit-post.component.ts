import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { take } from 'rxjs';
import { Post } from 'src/app/core/model/post';
import { PostService } from 'src/app/core/services/post.service';
import { PostPublicQuery } from 'src/app/core/state/post-public/post.public.query';
import { PostQuery } from 'src/app/core/state/post/post.query';
import { SessionQuery } from 'src/app/core/state/session/session.query';

@UntilDestroy()
@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  isLoading = false;
  post: Post | any = undefined;
  isNew = false;
  form!: FormGroup;
  constructor(private route: ActivatedRoute, private postPublic: PostPublicQuery,
    private meta: Meta, private title: Title, private postQuery: PostQuery,
    private sessionQuery: SessionQuery, private postService: PostService,
    private router: Router) {

  }

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if(!id) {
      this.isNew = true;
      const userLoggedIn = this.sessionQuery.userLogin;
      this.form = new FormGroup({
        'userId': new FormControl(userLoggedIn.id, Validators.required),
        'title': new FormControl('', Validators.required),
        'body': new FormControl('', Validators.required)
      });
    } else {
      this.isNew = false;
      setTimeout(()=>{
        this.post = this.postQuery.getEntity(id);
        if(this.post) {
          this.meta.addTag({ name: 'description', content: this.post.body });
          this.meta.addTag({ name: 'title', content: this.post.title });
          this.title.setTitle('Medical Departures | '+ this.post.title);
        } else {
          this.post = this.postQuery.getEntity(id);
        }
        this.isLoading = false;
        this.form = new FormGroup({
          'id': new FormControl(this.post.id, Validators.required),
          'userId': new FormControl(this.post.userId, Validators.required),
          'title': new FormControl(this.post.title, Validators.required),
          'body': new FormControl(this.post.body, Validators.required)
        });
      }, 500);
    }
  }

  async onSubmit() {
    if(this.form.valid) {
      const formValue = this.form.value;
      if(this.isNew) {
         this.postService.addPost(formValue).pipe(take(1), untilDestroyed(this)).subscribe((data)=> { 
          this.router.navigate(['admin']);
         });
      } else {
        this.postService.updatePost(formValue).pipe(take(1), untilDestroyed(this)).subscribe((data)=> {
          this.router.navigate(['admin']);
        });
       
      }
    }
  }

}