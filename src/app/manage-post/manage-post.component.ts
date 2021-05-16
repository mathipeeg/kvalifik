import { Component, OnInit } from '@angular/core';
import {Post} from '../models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../data.service';
import {PostActions} from '../store/actions/PostActions';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../store/Store';
import { Location } from '@angular/common'

@Component({
  selector: 'app-manage-post',
  templateUrl: './manage-post.component.html',
  styleUrls: ['./manage-post.component.scss']
})
export class ManagePostComponent implements OnInit {

  public selectedPost: Post;
  public postForm: FormGroup;
  public headerTitle: string = 'Create New Post';
  public editMode: boolean = false;
  // loaded: boolean = false;
  tempCommentUser = {
    firstName: 'empty',
    lastName: 'empty',
    profileImage: 'empty'
  }
  tempComment = {
    id: -1,
    author: this.tempCommentUser,
    createdDate: new Date(),
    text: 'empty',
    likes: 0
  }
  tempResponsible = {
    id: -1,
    name: 'empty'
  }
  tempCollection = {
    id: -1,
    title: 'empty'
  }

  tempCollections = ['Collection1', 'Collection2', 'Collection3'];
  tempComments = ['U ROCK!', 'WOAH CALM DOWN SUPERSTAR','oooo neat!'];
  tempArray = ['temp1', 'temp2', 'temp3'];

  constructor(private route: ActivatedRoute,
              private tempDataService: DataService,
              private fb: FormBuilder,
              private router: Router,
              private postActions: PostActions,
              private ngRedux: NgRedux<AppState>,
              private location: Location) { }

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('myId');
    console.log(id);

    if (id) {
      this.headerTitle = 'Edit Post';
      this.editMode = true;
    }

    // this.selectedPost = this.tempDataService.getPosts().find(post => post.id === id);
    this.ngRedux.select(state => state.posts).subscribe(res => {
      this.selectedPost = res.posts.find(post => post.id === id);
      // console.log(this.selectedPost);
    });

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
    // console.log(this.postForm);

    // Can you store this post object in the temp. data service
    // and then navigate to the posts component?
    if (!this.editMode) {
      this.selectedPost = this.postForm.value;
      this.selectedPost.createdDate = new Date();
      this.selectedPost.likes = 0;
      this.selectedPost.comments = [this.tempComment];
      this.selectedPost.media = 'test';
      this.selectedPost.pinned = false;
      this.selectedPost.responsible = [this.tempResponsible];
      this.selectedPost.collaboration = 'test';
      this.selectedPost.collections = [this.tempCollection];
      this.selectedPost.state = state;

      // console.log(this.selectedPost);
      this.postActions.addPost(this.selectedPost);
    } else {
      console.log('edit');
      this.selectedPost.title = this.postForm.value.title;
      this.selectedPost.text = this.postForm.value.text;
      this.postActions.updatePost(this.selectedPost);
    }
      // this.tempDataService.addPost(this.selectedPost);
      this.router.navigate(['posts']);
  }

  deletePost() {
    this.postActions.deletePost(this.selectedPost);
  }

  back(): void {
    this.location.back();
  }

}
