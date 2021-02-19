import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Post } from '../entities/Post';

@Component({
  selector: 'app-neweditpost',
  templateUrl: './neweditpost.component.html',
  styleUrls: ['./neweditpost.component.scss']
})
export class NeweditpostComponent implements OnInit {
  public selectedPost: Post;

  constructor(private route: ActivatedRoute, private tempDataService: DataService) { }

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('myId');
    console.log(id);

    this.selectedPost = this.tempDataService.getPosts().find(post => post.id === id);
    console.log(this.selectedPost);
    

  }

}
