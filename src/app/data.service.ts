import { Injectable } from '@angular/core';
import { Post } from './entities/Post';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private posts: Post[] = [
    {id: '1', createdDate: new Date(2021, 0, 2), title: 'Is there life out there', text: 'Something' } as Post,
    {id: '2', createdDate: new Date(2021, 1, 2), title: 'Do androids dream of electric sheep?', text: 'Something' } as Post,
    {id: '3', createdDate: new Date(2021, 2, 2), title: 'What other good questions are there?', text: 'Something' } as Post,
    {id: '4', createdDate: new Date(2021, 3, 2), title: 'How many stars are there in the visible universe?', text: 'Something' } as Post,
    {id: '5', createdDate: new Date(2021, 4, 2), title: 'What lies beyond the visible universe?', text: 'Something' } as Post,
  ];

  constructor() { }

  public getPosts() {
    return this.posts;
  }

  public addPost(post: Post) {
    // do something to add a new post
    this.posts.push(post);
  }

  public deletePost(id: any) {
    // delete a post
  }
}
