import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [{ path: 'users', component: UserListComponent },
  { path: 'users/new', component: UserFormComponent },
  {path: 'users',component:UserListComponent},
  { path: 'users/edit/:id', component: UserFormComponent },
  { path: 'users/:id', component: UserDetailComponent }, 
  { path: '', redirectTo: '/users', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/users' },]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
