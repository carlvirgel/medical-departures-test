import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: '', component: AppComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/public/public.module').then(m => m.PublicModule)
      },
      { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard] } 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
