import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Post } from '../entities/Post';
import { PostActions } from '../store/actions/PostActions';
import { AppState } from '../store/Store';

@Component({
  selector: 'app-neweditpost',
  templateUrl: './neweditpost.component.html',
  styleUrls: ['./neweditpost.component.scss']
})
export class NeweditpostComponent implements OnInit {
  public selectedPost: Post;
  public postForm: FormGroup;
  public headerTitle: String = 'Create New Post';
  public editMode: boolean = false;

  constructor(private route: ActivatedRoute, private tempDataService: DataService,
    private fb: FormBuilder, private router: Router, private postActions: PostActions,
    private ngRedux: NgRedux<AppState>) { }

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('myId');
    console.log(id);
    if (id !== null) {
      this.headerTitle = "Edit Post";
      this.editMode = true;
    }

    
    // this.selectedPost = this.tempDataService.getPosts().find(post => post.id === id);
    this.ngRedux.select(state => state.posts).subscribe(res => {
      this.selectedPost = res.posts.find(post => post.id === id);
      // console.log("found");
      // console.log(this.selectedPost);
    });
    if (this.selectedPost === undefined) {
      this.selectedPost = new Post();
    }
    // console.log(this.selectedPost);
    

    this.postForm = this.fb.group({
      title: [this.selectedPost.title, Validators.required],
      text: [this.selectedPost.text, Validators.required],
    });
  }

  onSubmitPost() {
    console.log(this.postForm);
    
    if (this.postForm.valid){
      
      // Can you store this post object in the temp. data service 
      // and then navigate to the posts component?
      if (!this.editMode) {
        this.selectedPost = this.postForm.value;
        this.selectedPost.createdDate = new Date();
        // this.selectedPost.id = ""+Math.random(); // temporary until we connect to a backend.
  
        // console.log(this.selectedPost);
        
        this.postActions.addPost(this.selectedPost);
      } else {
        // console.log("call update");
        // console.log(this.selectedPost);
        // console.log(this.postForm.value);
        
        this.selectedPost.title = this.postForm.value.title;
        this.selectedPost.text = this.postForm.value.text;
        
        this.postActions.updatePost(this.selectedPost);
      }
      // this.tempDataService.addPost(this.selectedPost);
      this.router.navigate(['posts']);
    }
   
  }



}
