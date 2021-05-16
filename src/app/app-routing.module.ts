import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatsComponent } from './chats/chats.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { NeweditpostComponent } from './neweditpost/neweditpost.component';
import { Posts_oldComponent } from './posts_old/posts_old.component';
import { RegisterComponent } from './register/register.component';
import {PostsComponent} from './posts/posts.component';
import {ManagePostComponent} from './manage-post/manage-post.component';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
  { path: 'posts', component: PostsComponent },
  { path: 'events', component: EventsComponent },
  { path: 'chats', component: ChatsComponent },
  { path: 'managepost', component: ManagePostComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'postsold', component: Posts_oldComponent },
  { path: 'managepostold', component: NeweditpostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
