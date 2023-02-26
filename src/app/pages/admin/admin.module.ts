import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManagePostComponent } from './manage-post/post.manage.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: '', component: ManagePostComponent },
      { path: 'post', component: EditPostComponent },
      { path: 'post/:id', component: EditPostComponent }
    ]
  }
];



@NgModule({
  declarations: [AdminComponent, ManagePostComponent, EditPostComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
