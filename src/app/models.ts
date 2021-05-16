export class Collection {
  id;
  title: string;
  description: string;
  created: Date;
  postContent: string[];
  eventContent: string[];
  status: string;
  pinned: false;
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
}

export class EventSchedule {
  id;
  title: string;
  startTime: string;
}

export class Collaboration {
  id;
  title: string;
  description: string;
  date: Date;
  accepted: boolean;
}

export class Post {
  id;
  createdDate: Date;
  title: string;
  text: string;
  media?: string;
  collections: string[];
  comments: string[];
  pinned: boolean;
  state: string; // Todo: look into enums
  likes: number;
  responsible: Volunteer[];
  collaboration: string;
}

export class Volunteer {
  id;
  firstName: string;
  lastName: string;
  studyProgramme: string;
  startDate: Date;
  userType: string;
}

export class StudyProgramme {
  id;
  title: string;
}

export class Comment {
  id;
  author: string;
  createdDate: Date;
  text: string;
  likes: number;
}

export class User {
  id;
  firstName: string;
  lastName: string;
  role: string; // admin, student, moderator
  username: string; // todo: is this necessary?
  password: string;
  email: string;
  profileImage?: string;
  coverPhoto?: string;
  signupDate: Date;
  title?: string;
}
