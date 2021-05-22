import {CommentTriviaType} from '@angular/compiler-cli/src/ngtsc/typecheck/src/comments';

export class Collection {
  id: string;
  title: string;
  description: string;
  created: Date;
  postContent: string[];
  eventContent: string[];
  status: string;
  pinned: false;
  // manualId: string;
}

export class Event {
  id;
  title: string;
  description: string;
  startDate: Date;
  startTime: string;
  endDate: Date;
  endTime: string;
  location: string;
  status: string;
  schedule: EventSchedule[];
  photo?: string;
  pinned: false;
  responsible: string[];
  collaboration: string;
  manualId: string;
  room: string;
}

export class EventSchedule {
  id;
  title: string;
  startTime: string;
  manualId: string;
}

export class Collaboration {
  id;
  title: string;
  userId: string;
  postId: string;
  accepted: boolean;
}

export class CollabPost {
  title: string;
  accepted: boolean;
  postTitle: string;
  postDescription: string;
  postDate: Date;
  postId: string;
  collabId: string;
}

export class Post {
  id;
  createdDate: Date;
  title: string;
  text: string;
  media?: string;
  collections: string[];
  comments: Comment[];
  pinned: boolean;
  state: string; // Todo: look into enums
  likes: number;
  responsible: string[];
  collaboration: string;
  manualId: string;
  mediaType?: string;
}

export class Volunteer {
  id;
  firstName: string;
  lastName: string;
  studyProgramme: string;
  startDate: Date;
  userType: string;
  manualId: string;
}

export class StudyProgramme {
  id;
  title: string;
}

export class Comment {
  id;
  manualId: string;
  authorId: string;
  author?: CommentUser;
  createdDate: Date;
  text: string;
  likes: number;
}

export class CommentUser {
  id;
  name: string;
  profilePhoto?: string;
}

export class User {
  id;
  firstName: string;
  lastName: string;
  coverPhoto?: string;
  role: string; // admin, student, moderator
  referenceKey: string;
  username: string; // todo: is this necessary?
  password: string;
  email: string;
  profileImage?: string;
  signupDate: Date;
  title?: string;
}
