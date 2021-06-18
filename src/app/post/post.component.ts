import {ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import {Collaboration, Collection, Post, Comment, Volunteer, User, CommentUser} from '../models';
import {ActivatedRoute, Router} from '@angular/router';
import {PostActions} from '../store/actions/PostActions';
import {PostsService} from '../services/posts.service';
import {CollectionActions} from '../store/actions/CollectionActions';
import {CommentActions} from '../store/actions/CommentActions';
import {VolunteerActions} from '../store/actions/VolunteerActions';
import {CollaborationActions} from '../store/actions/CollaborationActions';
import {CollaborationService} from '../services/collaboration.service';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../store/Store';
import {UsersService} from '../services/users.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @ViewChild('commentText') commentTextArea: ElementRef;

  currentPost: Post | undefined;
  currentUser: User | undefined;
  collaboration = {} as Collaboration;
  collections = [] as Collection[];
  comments = [] as Comment[];
  volunteers = [] as Volunteer[];
  idToken: string;

  constructor(private route: ActivatedRoute,
              private postService: PostsService,
              private collectionActions: CollectionActions,
              private commentsActions: CommentActions,
              private volunteerActions: VolunteerActions,
              private collabService: CollaborationService,
              private ngRedux: NgRedux<AppState>,
              private authService: AuthService,
              private router: Router,
              private userService: UsersService,
              private postActions: PostActions) { }

  ngOnInit(): void {
    this.idToken = sessionStorage.getItem('googleToken');
    if(this.idToken) {
      this.authService.getUserInfo(atob(JSON.parse(this.idToken))).subscribe(googleUser => {
        const localId = googleUser['users'][0].localId;
        this.userService.getUserByReferenceKey(localId).subscribe(user => {
          for (const userId in user) {
            this.currentUser = user[userId];
          }
        })
      });
    }
    const id: string = this.route.snapshot.paramMap.get('postId');

    this.collectionActions.readCollections();
    this.commentsActions.readComments();
    this.volunteerActions.readVolunteers();

    this.postService.getPostById(id).subscribe(post => {
      this.currentPost = post;
      this.currentPost.id = id;
      console.log(this.currentPost);

      this.collabService.getCollabById(this.currentPost.collaboration).subscribe(collab => {
        this.collaboration = collab;
      });

      this.ngRedux.select(state => state.collections).subscribe(res => { // holder øje med state af posts og får dem fra select()
        this.checkId(res.collections, this.currentPost.collections, this.collections);
      });

      this.ngRedux.select(state => state.comments).subscribe(res => { // holder øje med state af posts og får dem fra select()
        for (const i of res.comments) {
          for (const j of this.currentPost.comments) {
            if(i.manualId === j.manualId) {
              if(!this.comments.includes(i)) {
                console.log(i);
                this.comments.push(i);
              }
            }
          }
        }
      });

      this.ngRedux.select(state => state.volunteers).subscribe(res => { // holder øje med state af posts og får dem fra select()
        this.checkId(res.volunteers, this.currentPost.responsible, this.volunteers)
      });
    });
  }

  // resetComments() {
  //   this.commentsActions.readComments();

  // }

  checkId(resultArray, thisCurrentPost, thisArray) {
    for (const i of resultArray) {
      for (const j of thisCurrentPost) {
        if(i.id === j) {
          if(!thisArray.includes(i)) {
            thisArray.push(i);
            console.log(thisArray);
            console.log(i);
          }
        }
      }
    }
  }

  editPost(id: string) {
    this.router.navigate(['/managepost', {myId: id}])
  }

  likePost(post: Post) {
    post.likes += 1;
    this.postActions.updatePost(post);
  }

  addComment() {
    const element = this.commentTextArea.nativeElement;
    if (element.style.display === 'none') {
      element.style.display = 'flex';
    } else {
      element.style.display = 'none';
    }
  }

  likeComment(comment: Comment) {
    comment.likes += 1;
    this.commentsActions.updateComment(comment);
  }

  deleteComment(comment: Comment) {
    for (const i of this.currentPost.comments) {
      if (i.manualId === comment.manualId) {
        const tempArray = this.currentPost.comments; // copy of the array.
        const j = this.currentPost.comments.findIndex(ele => ele.manualId === i.id);
        tempArray.splice(j, 1);
        this.currentPost.comments = tempArray;
      }
    }
    this.postActions.updatePost(this.currentPost);
    this.commentsActions.deleteComment(comment);
  }

  testChange(event, comment) {
    const key = event.keyCode;
    if (key === 13) {
      const newComment = {} as Comment;
      const newCommentUser = {} as CommentUser;
      newCommentUser.profilePhoto = this.currentUser.profileImage;
      newCommentUser.name = this.currentUser.username.split('@')[0]; // todo: have this linked to database with names just cba
      newCommentUser.id = this.currentUser.id;

      newComment.authorId = newCommentUser.id;
      // newComment.postId = this.currentPost.id;
      newComment.author = newCommentUser;
      newComment.createdDate = new Date();
      newComment.text = comment;
      newComment.likes = 0;
      newComment.manualId = this.currentPost.id + this.currentPost.comments.length + 1;
      // add comment
      this.commentsActions.addComment(newComment)

      // update post
      this.currentPost.comments.push(newComment);
      this.postActions.updatePost(this.currentPost);
      this.addComment();
    }
  }
}
