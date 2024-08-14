import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {EventService} from "../services/event.service";
import {DiagramStateService} from "../services/diagram-state.service";
import {Event} from "../model/event.model";
import {Subscription} from "rxjs";
import {UntilDestroy} from "@ngneat/until-destroy";

@Component({
  selector: 'cr-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
@UntilDestroy()
export class DetailsComponent implements AfterViewInit, OnDestroy{

  obj!: Event;
  currentObjSubscription!: Subscription;

  constructor(private eventService: EventService, private state :DiagramStateService) {
  }

  ngAfterViewInit(): void {
    this.currentObjSubscription = this.eventService.selectedObj$.subscribe(event => {
      this.obj = event;
    });
  }

  ngOnDestroy(): void {
    this.currentObjSubscription.unsubscribe();
  }

}
