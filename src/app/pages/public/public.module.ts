import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from "../../shared/shared.module";
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  {
    path: '', component: PublicComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'post/:id', component: PostComponent } 
    ]
  }
];


@NgModule({
    declarations: [
        LoginComponent,
        HomeComponent,
        PublicComponent,
        PostComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class PublicModule { }
