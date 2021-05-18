import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { PostActions } from '../store/actions/PostActions';
import { AppState } from '../store/Store';
import {Post} from '../models';

@Component({
  selector: 'app-posts',
  templateUrl: './posts_old.component.html',
  styleUrls: ['./posts_old.component.scss']
})
export class Posts_oldComponent implements OnInit {
  public posts: Post[];
  public isHappy: boolean;
  birthday = new Date(1988, 3, 15);
  public search: string = '';

  constructor(private router: Router, private tempDataService: DataService,
    private ngRedux: NgRedux<AppState>, private postActions: PostActions) { }

  ngOnInit(): void {
    this.postActions.readPosts();

    this.ngRedux.select(state => state.posts).subscribe(res => {
      // this.isHappy = res.isHappy;
      this.posts = res.posts;
    });

    // this.tempData = this.tempDataService.getPosts();
  }
  editPost(id: any) {
    this.router.navigate(['neweditpost', {myId: id}])
  }

}
