import { Component, OnInit } from '@angular/core';
import {EventService} from '../event.service';
import {Event} from '../models';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events = [] as Event[];
  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
      console.log(this.events);
    })
  }

}
