import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../services/event.service';
import {Collaboration, Event, EventSchedule, Post, Volunteer} from '../models'
import { Location } from '@angular/common'
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VolunteerService} from '../services/volunteer.service';
import {CollaborationService} from '../services/collaboration.service';
import base58 from 'base58-encode';
import {Observable, Subject} from 'rxjs';
import {map, startWith, switchMap, takeUntil, withLatestFrom} from 'rxjs/operators';
import {migrateLegacyGlobalConfig} from '@angular/cli/utilities/config';
import {createWebpackLoggingCallback} from '@angular-devkit/build-angular/src/webpack/utils/stats';
import {DialogContentExampleDialog} from '../manage-post/manage-post.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogContentDialog} from '../manage-collection/manage-collection.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-manage-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.scss']
})
export class ManageEventComponent implements OnInit {
  @ViewChild('startTime') startTime: ElementRef | undefined;
  @ViewChild('title') title: ElementRef | undefined;

  currentId: string;
  currentEvent = {} as Event;
  editMode: boolean = false;
  headerTitle: string = 'Create Event';
  volunteers = [] as Volunteer[];
  collaborations = [] as Collaboration[];
  public eventForm: FormGroup
  schedule = [] as EventSchedule[];

  constructor(private route: ActivatedRoute,
              private eventService: EventService,
              private location: Location,
              private fb: FormBuilder,
              private volunteerService: VolunteerService,
              private collaborationService: CollaborationService,
              private router: Router,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.currentId = this.route.snapshot.paramMap.get('id');
    if (this.currentId) {
      this.editMode = true;
      this.headerTitle = 'Edit Event'
    }

    this.eventService.getEventById(this.currentId).subscribe(event => {
      if (event) {
        this.currentEvent = event;
        for (const id in this.currentEvent.schedule) {
          this.currentEvent.schedule[id].manualId = id;
          this.schedule.push(this.currentEvent.schedule[id]); // todo: TILFØJ MANUALID GODDAMIT FUCKING FIREBASE I DIE
        }
        this.currentEvent.manualId = this.currentId;
      } else {
        this.currentEvent = new Event();

      }
    });

    this.eventForm = this.fb.group({
      title: [this.currentEvent.title, Validators.required],
      startDate: [this.currentEvent.startDate, Validators.required],
      startTime: [this.currentEvent.startTime, Validators.required],
      endDate: [this.currentEvent.endDate, Validators.required],
      endTime: [this.currentEvent.endTime, Validators.required],
      description: [this.currentEvent.description, Validators.required],
      eventSchedule: [this.currentEvent.schedule],
      photo: [this.currentEvent.photo],
      location: [this.currentEvent.location, Validators.required],
      pinned: [this.currentEvent.pinned, Validators.required],
      responsible: [this.currentEvent.responsible, Validators.required],
      collaboration: [this.currentEvent.collaboration, Validators.required],
      room: [this.currentEvent.room]
    });

    this.volunteerService.readVolunteers().subscribe(vols => {
      for (const id in vols) {
        this.volunteers.push(vols[id]);
      }
    });
    this.collaborationService.readCollaborations().subscribe(colls => {
      for (const id in colls) {
        this.collaborations.push(colls[id]);
      }
    });
  }

  back(): void {
    this.location.back();
  }

  onSubmitPost(state) {
    if (this.editMode) {
      console.log(this.currentEvent.startDate)
      const edits = ['title', 'description', 'startDate', 'startTime', 'endDate', 'endTime', 'photo', 'location', 'pinned', 'responsible', 'collaboration'];
      for (const i of edits) {
        if (this.eventForm.value[i]) {
          console.log(i)
          if (i === 'startDate' || i === 'endDate') {
            this.currentEvent[i] = this.eventForm.value[i].toISOString();
          } else {
            this.currentEvent[i] = this.eventForm.value[i];
          }
        }
      }
      this.currentEvent.status = state;
      this.eventService.updateEvent(this.currentEvent).subscribe();
      console.log(this.currentEvent)
    } else {
      this.currentEvent = this.eventForm.value;
      this.currentEvent.status = state;
      this.eventService.addEvent(this.currentEvent).subscribe();
    }
    this.router.navigate(['events', {published: true}]);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteEvent();
      }
    });
  }

  deleteEvent() {
    this.eventService.deleteEvent(this.currentEvent.manualId).subscribe();
    this.router.navigate(['/events']);
  }

  removeSchedule(id) {
    this.eventService.deleteSchedule(id, this.currentEvent.manualId).subscribe();
  }

  onEnter() {
    if (this.startTime && this.title) {
      const newSchedule = {
        startTime: this.startTime.nativeElement.value,
        title: this.title.nativeElement.value
      } as EventSchedule
      this.eventService.addSchedule(newSchedule, this.currentEvent.manualId).subscribe();
    }
  }

  openRoomDialog() {
    const dialogRef = this.dialog.open(DialogRoom);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.openSnackBar('Your request for a room has been sent!', 'x');
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'end'
    });
  }
}

@Component({
  selector: 'dialog-room',
  templateUrl: 'dialog-room.html',
  styleUrls: ['dialog-room.scss']
})
export class DialogRoom {

  times = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  endTimes = ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
  buildings = ['Building 1', 'Building 2', 'Building 3', 'Building 4'];

  constructor(public dialogRef: MatDialogRef<DialogContentDialog>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
