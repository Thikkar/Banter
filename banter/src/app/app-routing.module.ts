import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

const routes: Routes = [
  {path: '', component: NewsComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'profile/edit', component: ProfileComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'article/:id', component: ArticleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
