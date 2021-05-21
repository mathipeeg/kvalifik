import { Component, OnInit } from '@angular/core';
import {EventService} from '../services/event.service';
import {Event} from '../models';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events = [] as Event[];
  currentEvents = [] as Event[];
  pastEvents = [] as Event[];
  displayedColumns: string[] = ['title', 'date', 'location', 'status', 'edit'];
  pastDataSource = new MatTableDataSource<any>();
  currentDataSource = new MatTableDataSource<any>();

  constructor(private eventService: EventService,
              private router: Router) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(events => {
      for (const i in events) {
        const tempEvent = events[i];
        tempEvent.manualId = i;
        this.events.push(tempEvent);
      }
      let now: any = new Date()
      now = Date.parse(now.toISOString());
      for (const eventId in this.events) {
        const eventDate = Date.parse(this.events[eventId].endDate.toString());
        if (eventDate < now) {
          this.pastEvents.push(this.events[eventId])
        } else {
          this.currentEvents.push(this.events[eventId])
        }
      }
      this.pastDataSource.data = this.pastEvents;
      this.currentDataSource.data = this.currentEvents;
    })
  }

  openEvent(id: string) {
    console.log(id)
  }

  editEvent(id: string) {
    console.log(id);
    this.router.navigate(['/manageevent', {id}]);
  }

}
