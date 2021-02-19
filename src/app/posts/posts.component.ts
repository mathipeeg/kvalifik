import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  editPost(id: any) {
    this.router.navigate(['neweditpost', {myId: id}])
  }
}
