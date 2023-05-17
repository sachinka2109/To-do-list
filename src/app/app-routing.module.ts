import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoFormComponent } from './components/todo-list/todo-form/todo-form.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TodoDetailsComponent } from './components/todo-list/todo-details/todo-details.component';
import { TodoEditComponent } from './components/todo-list/todo-details/todo-edit/todo-edit.component';
import { AuthComponent } from './components/auth/auth.component';
import { canActivate, redirectUnauthorizedTo,redirectLoggedInTo } from '@angular/fire/auth-guard';
import { ToDoResolverService } from './components/todo-list/todo-resolver.service';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['']);

const routes: Routes = [
  {path: '', redirectTo: '/list', pathMatch: 'full'},
  {path: 'list', component: TodoListComponent,children:[
    {path: 'add',component: TodoFormComponent},
  ],...canActivate(redirectToLogin)},
  {path: 'details/:id', component: TodoDetailsComponent,...canActivate(redirectToLogin),resolve:[ToDoResolverService]},
  {path: ':id/edit',component: TodoEditComponent,...canActivate(redirectToLogin),resolve:[ToDoResolverService]},
  {path: 'login',component: AuthComponent,...canActivate(redirectToHome)},
  {path:'**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
