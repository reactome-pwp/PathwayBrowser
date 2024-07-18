import {AfterViewInit, Component, ElementRef, OnDestroy} from '@angular/core';
import {EventService} from "../services/event.service";
import {SpeciesService} from "../services/species.service";
import {DiagramStateService} from "../services/diagram-state.service";
import {Router} from "@angular/router";
import {Event} from "../model/event.model";
import {Subscription} from "rxjs";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@Component({
  selector: 'cr-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
@UntilDestroy()
export class DetailsComponent implements AfterViewInit, OnDestroy{

  event!: Event;
  currentEventSubscription!: Subscription;

  constructor(private eventService: EventService, private state :DiagramStateService) {
  }

  ngAfterViewInit(): void {
  this.currentEventSubscription = this.eventService.selectedEvent$.subscribe(event => {
    this.event = event;
  });}

  ngOnDestroy(): void {
    this.currentEventSubscription.unsubscribe();
  }

}
