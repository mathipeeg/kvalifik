import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Post } from '../entities/Post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  public tempData: Post[];
  
  constructor(private router: Router, private tempDataService: DataService) { }

  ngOnInit(): void {
    this.tempData = this.tempDataService.getPosts();
  }
  editPost(id: any) {
    this.router.navigate(['neweditpost', {myId: id}])
  }
  
}
