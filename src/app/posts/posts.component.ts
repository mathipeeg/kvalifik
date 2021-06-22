import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../services/data.service';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../store/Store';
import {PostActions} from '../store/actions/PostActions';
import {Post} from '../models';
import { MatTableModule } from '@angular/material/table';
import {CollectionActions} from '../store/actions/CollectionActions';
import {VolunteerActions} from '../store/actions/VolunteerActions';
import {CollaborationService} from '../services/collaboration.service';
import {CollaborationActions} from '../store/actions/CollaborationActions';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  public posts: Post[] = [];
  idToken: string;
  displayedColumns: string[] = ['title', 'created', 'type', 'activity', 'status', 'edit'];
  search: string = '';

  constructor(private router: Router,
              private tempDataService: DataService,
              private ngRedux: NgRedux<AppState>,
              private postActions: PostActions,
              private route: ActivatedRoute,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.idToken = sessionStorage.getItem('googleToken');

    const published: string = this.route.snapshot.paramMap.get('published');
    this.postActions.readPosts();
    if (published && published === 'true') {
      this.openSnackBar('Your event/post was successfully published!', 'x');
    }

    this.ngRedux.select(state => state.posts).subscribe(res => { // holder øje med state af posts og får dem fra select()
      this.posts = res.posts;
      for (const id in this.posts) {
        if (this.posts[id].media.includes('jpg') || this.posts[id].media.includes('jpeg') || this.posts[id].media.includes('png')) {
          this.posts[id].mediaType = 'Photo';
        } else {
          this.posts[id].mediaType = 'Video';
        }
      }
      // console.log(this.posts);
    });
  }

  editPost(id: any) {
    // console.log(id);
    this.router.navigate(['/managepost', {postId: id}])
  }

  openPost(id: any) {
    // console.log(id);
    this.router.navigate(['/post', {postId: id}])
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'end'
    });
  }
}
