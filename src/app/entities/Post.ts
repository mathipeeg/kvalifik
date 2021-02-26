import { Collection } from "./Collection";
import { User } from "./User";

export class Post {
    id;
    createdDate: Date;
    private title: string;
    text: string;
    media?: string;
    collections: Collection[];
    comments: Comment[];
    // constructor() {
    //     this.title = '';
    //     this.text = '';
    // }
    getTitle(){return this.title};
    setTitle(title: string) {this.title = title};
}

export class Comment {
    id;
    author: UserVm;
    createdDate: Date;
    text: string;
}

export class UserVm {
    firstName: string;
    lastName: string;
    profileImage?: string;
}