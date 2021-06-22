import {Component, OnInit} from '@angular/core';
import {Collection, Post, Comment, CommentUser, User, Volunteer, Collaboration} from '../models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../services/data.service';
import {PostActions} from '../store/actions/PostActions';
import {NgRedux} from '@angular-redux/store';
import {AppState, CollaborationState} from '../store/Store';
import { Location } from '@angular/common'
import { CollectionActions } from '../store/actions/CollectionActions';
import {CommentActions} from '../store/actions/CommentActions';
import {UserActions} from '../store/actions/UserActions';
import {UsersService} from '../services/users.service';
import {VolunteerActions} from '../store/actions/VolunteerActions';
import {CollaborationActions} from '../store/actions/CollaborationActions';
import {MatDialog} from '@angular/material/dialog';
import {CollaborationService} from '../services/collaboration.service';
import base58 from 'base58-encode';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-manage-post',
  templateUrl: './manage-post.component.html',
  styleUrls: ['./manage-post.component.scss']
})
export class ManagePostComponent implements OnInit {

  currentUser: User | undefined;
  public selectedPost: Post;
  public postForm: FormGroup;
  public headerTitle: string = 'Create New Post';
  public editMode: boolean = false;
  collections: Collection[] = [];
  comments: Comment[] = [];
  volunteers: Volunteer[] = [];
  collaborations: Collaboration[] = [];
  idToken: string;

  emptyComment = {
    id: 0,
    authorId: '0',
    author: null,
    createdDate: new Date(),
    text: ' ',
    likes: 0,
    manualId: '0'
  }

  constructor(private route: ActivatedRoute,
              private tempDataService: DataService,
              private fb: FormBuilder,
              private router: Router,
              private postActions: PostActions,
              private ngRedux: NgRedux<AppState>,
              private location: Location,
              private collectionActions: CollectionActions,
              private commentActions: CommentActions,
              private volunteerActions: VolunteerActions,
              private collabActions: CollaborationActions,
              private userService: UsersService,
              public dialog: MatDialog,
              private collaborationService: CollaborationService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.idToken = sessionStorage.getItem('googleToken');
    if(this.idToken) {
      this.authService.getUserInfo(atob(JSON.parse(this.idToken))).subscribe(googleUser => {
        const localId = googleUser['users'][0].localId;
        this.userService.getUserByReferenceKey(localId).subscribe(user => {
          for (const i in user) {
            this.currentUser = user[i];
          }
          console.log(this.currentUser)
        })
      });
    }
    const id: string = this.route.snapshot.paramMap.get('postId');

    if (id) {
      this.headerTitle = 'Edit Post';
      this.editMode = true;
    }

    this.collectionActions.readCollections();
    this.volunteerActions.readVolunteers();
    this.collabActions.readCollabs();

    this.ngRedux.select(state => state.collections).subscribe(res => { // holder øje med state af posts og får dem fra select()
      this.collections = res.collections;
    });
    this.ngRedux.select(state => state.volunteers).subscribe(res => { // holder øje med state af posts og får dem fra select()
      this.volunteers = res.volunteers;
    });
    this.ngRedux.select(state => state.collabs).subscribe(res => { // holder øje med state af posts og får dem fra select()
      this.collaborations = res.collabs;
    });
    this.ngRedux.select(state => state.posts).subscribe(res => {
      this.selectedPost = res.posts.find(post => post.id === id);
    });

    if(this.editMode) {
      this.commentActions.readComments();
      this.ngRedux.select(state => state.comments).subscribe(res => { // holder øje med state af posts og får dem fra select()
        this.comments = res.comments; // todo: do a query instead
      });
    }

    if (this.selectedPost === undefined) {
      this.selectedPost = new Post();
    }

    this.postForm = this.fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
      media: [''],
      collections: [''],
      pinned: ['', Validators.required],
      responsible: ['', Validators.required],
      collaboration: ['', Validators.required],
    });
  }

  onSubmitPost(state) {
    if (!this.editMode) {
      console.log(this.postForm);
      this.selectedPost = this.postForm.value;
      this.selectedPost.createdDate = new Date();
      this.selectedPost.likes = 0;
      this.selectedPost.comments = [this.emptyComment];
      this.selectedPost.state = state;
      this.selectedPost.manualId = base58(this.selectedPost.title.length + 'ID');
      this.postActions.addPost(this.selectedPost);

      const tempCollab = {
        title: this.selectedPost.title,
        userId: this.currentUser.id,
        postId: this.selectedPost.manualId,
        accepted: false
      } as Collaboration
      this.collaborationService.saveCollaboration(tempCollab).subscribe();

    } else {
      const edits = ['title', 'text', 'media', 'collections', 'pinned'];
      for (const edit of edits) {
        // console.log(this.postForm.value[edit]);
        if(this.postForm.value[edit]) {
          this.selectedPost[edit] = this.postForm.value[edit];
        }
      }
      console.log(this.selectedPost)
      this.selectedPost.state = state;
      this.postActions.updatePost(this.selectedPost);
    }
    this.router.navigate(['/posts', {published: true}]);
  }

  deletePost() {
    this.postActions.deletePost(this.selectedPost);
   this.router.navigate(['/posts']);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deletePost();
      }
    });
  }

  back(): void {
    this.location.back();
  }

  deleteComment(comment: Comment) {
    for (const i of this.selectedPost.comments) {
      if (i.manualId === comment.manualId) {
        const tempArray = this.selectedPost.comments; // copy of the array.
        const j = this.selectedPost.comments.findIndex(ele => ele.manualId === i.id);
        tempArray.splice(j, 1);
        this.selectedPost.comments = tempArray;
      }
    }
    this.postActions.updatePost(this.selectedPost);
    this.commentActions.deleteComment(comment);
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {}
