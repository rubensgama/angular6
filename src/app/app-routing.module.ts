import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { LogonComponent } from './logon/logon.component';
import { TodosComponent } from './todos/todos.component';

const routes : Routes = [
  {path: '', component: AppComponent, canActivate: [AuthGuard]},
  {path: 'logon', component: LogonComponent},
  {path: 'todos', component: TodosComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
