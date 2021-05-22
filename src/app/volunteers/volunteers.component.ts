import { Component, OnInit } from '@angular/core';
import {VolunteerService} from '../services/volunteer.service';
import {Volunteer} from '../models';

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.scss']
})
export class VolunteersComponent implements OnInit {

  volunteers = [] as Volunteer[];
  constructor(private volunteerService: VolunteerService) { }

  ngOnInit(): void {
    this.volunteerService.readVolunteers().subscribe(vols => {
      for (const id in vols) {
        const tempVol = vols[id];
        tempVol.manualId = id;
        this.volunteers.push(tempVol);
      }
      console.log(this.volunteers)
    })
  }

}
