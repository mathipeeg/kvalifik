import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Collection, User, Event, Post} from '../models';
import {UsersService} from '../services/users.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CollectionService} from '../services/collection.service';
import { Location } from '@angular/common'
import {PostsService} from '../services/posts.service';
import {EventService} from '../event.service';
import {DialogContentExampleDialog} from '../manage-post/manage-post.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {filter} from 'rxjs/operators';
import {CollectionActions} from '../store/actions/CollectionActions';

export interface DialogData {
  events: Event[];
  posts: Post[];
  choice: string;
}

@Component({
  selector: 'app-manage-collection',
  templateUrl: './manage-collection.component.html',
  styleUrls: ['./manage-collection.component.scss']
})
export class ManageCollectionComponent implements OnInit {

  headerTitle: string = 'New collection';
  editMode: boolean = false;
  currentUser = {} as User;
  collectionForm: FormGroup;
  currentCollection = {} as Collection;
  contentPosts = [] as Post[];
  contentEvents = [] as Event[];
  currentContents = [];
  contents = [];
  addedPosts = [];
  addedEvents = [];
  currentId: string;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private userService: UsersService,
              private collectionService: CollectionService,
              private eventService: EventService,
              private postService: PostsService,
              private location: Location,
              public dialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {
    this.currentId = this.route.snapshot.paramMap.get('id');

    if (this.currentId) {
      this.headerTitle = 'Edit Collection';
      this.editMode = true;
    }

    if (this.editMode) {
      this.collectionService.getCollectionById(this.currentId).subscribe(coll => {
        this.currentCollection = coll;
        console.log(this.currentCollection);

        this.eventService.getEvents().subscribe(events => {
          for (const i in events) {
            this.contents.push(events[i]);
            this.contentEvents.push(events[i]);
            // i = id
            if (this.currentCollection.eventContent.includes(i)) {
              this.currentContents.push(events[i]);
            }
          }
          this.postService.readPosts().subscribe(posts => {
            for (const i in posts) {
              this.contents.push(posts[i]);
              this.contentPosts.push(posts[i]);
              if (this.currentCollection.postContent.includes(i)) {
                this.currentContents.push(posts[i]);
              }
            }
            console.log(this.currentContents);
            console.log(this.contents);
          })
        })
      })
    }

    if (!this.editMode) {
      this.eventService.getEvents().subscribe(events => {
        for (const i in events) {
          this.contentEvents.push(events[i]);
        }
        this.postService.readPosts().subscribe(posts => {
          for (const i in posts) {
            this.contentPosts.push(posts[i]);
          }
        })
      })
    }

    this.collectionForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      postContent: [['empty']],
      eventContent: [['empty']],
      pinned: [false, Validators.required],
    });

    this.currentUser = this.userService.getUser;
  }

  back(): void {
    this.location.back();
  }

  onSubmitCollection(state) {
    if (!this.editMode) {
      let newColl = {} as Collection;
      newColl = this.collectionForm.value;
      if(this.addedPosts) {
        for (const i of this.addedPosts) {
          newColl.postContent.push(i.id);
        }
      }
      if (this.addedEvents) {
        for (const i of this.addedEvents) { // todo: id
          newColl.eventContent.push(i.title);
        }
      }
      newColl.created = new Date();
      newColl.status = state;
      this.collectionService.createCollection(newColl).subscribe();
      this.router.navigate(['/collections', {published: true}]);

    } else {
      const edits = ['title', 'description', 'pinned'];
      for (const edit of edits) {
        if (this.collectionForm.value[edit]) {
          this.currentCollection[edit] = this.collectionForm.value[edit];
        }
      }
      this.currentCollection.status = state;
      if(this.addedPosts) {
        for (const i of this.addedPosts) {
          if (!this.currentCollection.postContent.includes(i.id)) {
            this.currentCollection.postContent.push(i.id);
          }
        }
      }
      if(this.addedEvents) {
        for (const i of this.addedEvents) { // todo: id
          if (!this.currentCollection.eventContent.includes('sXUHvUSL')) {
            this.currentCollection.eventContent.push('sXUHvUSL');
          }
        }
      }
      this.currentCollection.id = 'Rf8emLgia1ThwNz';
      this.collectionService.updateCollection(this.currentId, this.currentCollection).subscribe();
      this.router.navigate(['/collections', {published: false}]);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteCollection();
      }
    });
  }

  openContentDialog(content: string) {
    const dialogRef = this.dialog.open(DialogContentDialog, {
      data: {
        posts: this.contentPosts,
        events: this.contentEvents, // todo: only show posts and events that aren't added
        choice: content,
        edit: this.editMode}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (content === 'events') {
        this.addedEvents = result;
      } else {
        this.addedPosts = result;
      }
    });
  }

  deleteCollection() {
    this.collectionService.deleteCollection(this.currentId).subscribe();
    this.router.navigate(['/collections']);
  }

  removeAllCollections() {
    this.currentCollection.eventContent = ['empty'];
    this.currentCollection.postContent = ['empty'];
    console.log(this.currentCollection);
    this.collectionService.updateCollection(this.currentId, this.currentCollection).subscribe();
  }
}

@Component({
  selector: 'dialog-content-dialog',
  templateUrl: 'dialog-content-dialog.html',
  styleUrls: ['./dialog-content-dialog.scss']
})
export class DialogContentDialog implements OnInit{

  displayedColumns: string[];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  initialData = [];
  listData = [];
  constructor(public dialogRef: MatDialogRef<DialogContentDialog>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
    // if (this.data.edit) {
    //
    // }
    if (this.data.choice === 'events') {
      this.initialData = this.data.events;
      this.dataSource.data = this.data.events;
      this.displayedColumns = ['select', 'title', 'date', 'location'];
    } else {
      this.initialData = this.data.posts;
      this.dataSource.data = this.data.posts;
      this.displayedColumns = ['select', 'title', 'date'];
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.toLowerCase();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

