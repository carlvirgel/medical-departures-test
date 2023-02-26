import { Component, OnInit } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/core/model/post';
import { PostPublicQuery } from 'src/app/core/state/post-public/post.public.query';
import { PostQuery } from 'src/app/core/state/post/post.query';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  isLoading = false;
  post: Post | any = undefined;
  constructor(private route: ActivatedRoute, private postPublic: PostPublicQuery,
    private meta: Meta, private title: Title, private postQuery: PostQuery) {

  }

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    setTimeout(()=>{
      this.post = this.postPublic.getEntity(id);
      if(this.post) {
        this.meta.addTag({ name: 'description', content: this.post.body });
        this.meta.addTag({ name: 'title', content: this.post.title });
        this.title.setTitle('Medical Departures | '+ this.post.title);
      } else {
        this.post = this.postQuery.getEntity(id);
      }
      this.isLoading = false;
    }, 500);
  }

}
