import {Component, OnInit} from '@angular/core';
import {Collection, Post, Comment, CommentUser, User, Volunteer, Collaboration} from '../models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../services/data.service';
import {PostActions} from '../store/actions/PostActions';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../store/Store';
import { Location } from '@angular/common'
import { CollectionActions } from '../store/actions/CollectionActions';
import {CommentActions} from '../store/actions/CommentActions';
import {UserActions} from '../store/actions/UserActions';
import {UsersService} from '../services/users.service';
import {VolunteerActions} from '../store/actions/VolunteerActions';
import {CollaborationActions} from '../store/actions/CollaborationActions';

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
              private userService: UsersService) { }

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('myId');
    this.currentUser = this.userService.getUser;

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
        this.comments = res.comments;
      });
    }
    // for (const i in this.selectedPost.comments) {
    //   for (const j in this.comments) {
    //     console.log(i[0], j[0]);
    //   }
    // }

    if (this.selectedPost === undefined) {
      this.selectedPost = new Post();
    }

    this.postForm = this.fb.group({
      title: [this.selectedPost.title, Validators.required],
      text: [this.selectedPost.text, Validators.required],
      media: [this.selectedPost.media],
      collections: [this.selectedPost.collections],
      pinned: [this.selectedPost.pinned, Validators.required],
      responsible: [this.selectedPost.responsible, Validators.required],
      collaboration: [this.selectedPost.collaboration, Validators.required],
    });
  }

  onSubmitPost(state) {
    if (!this.editMode) {
      this.selectedPost = this.postForm.value;
      this.selectedPost.createdDate = new Date();
      this.selectedPost.likes = 0;
      this.selectedPost.comments = [this.emptyComment];
      this.selectedPost.state = state;
      this.postActions.addPost(this.selectedPost);
    } else {
      const edits = ['title', 'text', 'media', 'collections', 'pinned'];
      for (const edit of edits) {
        this.selectedPost[edit] = this.postForm.value[edit];
      }
      this.selectedPost.state = state;
      this.postActions.updatePost(this.selectedPost);
    }
    this.router.navigate(['/posts']);
  }

  deletePost() {
    this.postActions.deletePost(this.selectedPost);
   this.router.navigate(['/posts']);
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
