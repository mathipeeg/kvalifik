import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppComponent, DataSharingService} from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatListModule, MatSelectionList} from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import { EventsComponent } from './events/events.component';
import { ChatsComponent } from './chats/chats.component';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { PostComponent } from './post/post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { AppState } from './store/Store';
import { rootReducer } from './store/store';
import { LoginComponent } from './login/login.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { PostsPipe } from './posts.pipe';
import { PostsComponent } from './posts/posts.component';
import { MatTableModule } from '@angular/material/table';
import {DialogContentExampleDialog, ManagePostComponent} from './manage-post/manage-post.component';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ProfileComponent } from './profile/profile.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CollectionsComponent } from './collections/collections.component';
import {VolunteerInfoDialog, VolunteersComponent} from './volunteers/volunteers.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {DialogContentDialog, ManageCollectionComponent} from './manage-collection/manage-collection.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {DialogRoom, ManageEventComponent} from './manage-event/manage-event.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HeaderComponent } from './header/header.component';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    EventsComponent,
    ChatsComponent,
    PostComponent,
    LoginComponent,
    RegisterComponent,
    PostsPipe,
    PostsComponent,
    ManagePostComponent,
    ProfileComponent,
    DashboardComponent,
    CollectionsComponent,
    VolunteersComponent,
    DialogContentExampleDialog,
    ManageCollectionComponent,
    DialogContentDialog,
    ManageEventComponent,
    DialogRoom,
    HeaderComponent,
    VolunteerInfoDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgReduxModule,
    NgReduxRouterModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule, MatToolbarModule, MatIconModule, MatListModule, AppRoutingModule,
    MatInputModule, MatCardModule, MatGridListModule, MatTableModule, MatSelectModule,
    MatSlideToggleModule, MatDialogModule, MatSnackBarModule, DragDropModule, MatCheckboxModule,
    MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatMenuModule
  ],
  providers: [DataSharingService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private ngRedux: NgRedux<AppState>,
    private devTool: DevToolsExtension,
    private ngReduxRouter: NgReduxRouter,) {

    this.ngRedux.configureStore(rootReducer, {}, [],[ devTool.isEnabled() ? devTool.enhancer() : f => f]);
//    this.ngRedux.configureStore(rootReducer, {});

      ngReduxRouter.initialize(/* args */);
  }

 }
