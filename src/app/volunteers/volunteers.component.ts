import {Component, Inject, OnInit} from '@angular/core';
import {VolunteerService} from '../services/volunteer.service';
import {Event, Post, Volunteer} from '../models';
import {MatTableDataSource} from '@angular/material/table';
import {DialogContentExampleDialog} from '../manage-post/manage-post.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogContentDialog} from '../manage-collection/manage-collection.component';
import {SelectionModel} from '@angular/cdk/collections';

export interface VolunteerDialogData {
  volunteer: Volunteer;
}

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.scss']
})
export class VolunteersComponent implements OnInit {

  volunteers = [] as Volunteer[];
  displayedColumns: string[] = ['profilePic', 'name', 'userType', 'groups', 'volunteerSince', 'info'];
  dataSource = new MatTableDataSource<any>();

  constructor(private volunteerService: VolunteerService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.volunteerService.readVolunteers().subscribe(vols => {
      for (const id in vols) {
        const tempVol = vols[id];
        tempVol.manualId = id;
        this.volunteers.push(tempVol);
      }
      this.dataSource.data = this.volunteers;
      console.log(this.volunteers)
    })
  }

  info(element): void {
    const dialogRef = this.dialog.open(VolunteerInfoDialog, {
      data: {
        volunteer: element}
    });

    // dialogRef.afterClosed().subscribe(result => {
    // });
  }
}

@Component({
  selector: 'volunteer-info-dialog',
  templateUrl: 'volunteer-info-dialog.html',
})
export class VolunteerInfoDialog implements OnInit{
  volunteer: Volunteer | undefined;

  constructor(public dialogRef: MatDialogRef<DialogContentDialog>,
              @Inject(MAT_DIALOG_DATA) public data: VolunteerDialogData) {}

  ngOnInit(): void {
      this.volunteer = this.data.volunteer;
  }
}
