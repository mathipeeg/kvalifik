import { Component, OnInit } from '@angular/core';
import {VolunteerService} from '../services/volunteer.service';
import {Event, Volunteer} from '../models';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.scss']
})
export class VolunteersComponent implements OnInit {

  volunteers = [] as Volunteer[];
  // currentEvents = [] as Event[];
  // pastEvents = [] as Event[];
  displayedColumns: string[] = ['profilePic', 'name', 'userType', 'groups', 'volunteerSince', 'info'];
  // pastDataSource = new MatTableDataSource<any>();
  dataSource = new MatTableDataSource<any>();

  constructor(private volunteerService: VolunteerService) { }

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

}
