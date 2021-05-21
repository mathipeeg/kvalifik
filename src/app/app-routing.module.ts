import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatsComponent } from './chats/chats.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {PostsComponent} from './posts/posts.component';
import {ManagePostComponent} from './manage-post/manage-post.component';
import {ProfileComponent} from './profile/profile.component';
import {VolunteersComponent} from './volunteers/volunteers.component';
import {CollectionsComponent} from './collections/collections.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PostComponent} from './post/post.component';
import {ManageCollectionComponent} from './manage-collection/manage-collection.component';
import {ManageEventComponent} from './manage-event/manage-event.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  { path: 'posts', component: PostsComponent },
  { path: 'events', component: EventsComponent },
  { path: 'chats', component: ChatsComponent },
  { path: 'volunteers', component: VolunteersComponent },
  { path: 'collections', component: CollectionsComponent },
  { path: 'managepost', component: ManagePostComponent },
  { path: 'managecollection', component: ManageCollectionComponent },
  { path: 'manageevent', component: ManageEventComponent },
  { path: 'post', component: PostComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
