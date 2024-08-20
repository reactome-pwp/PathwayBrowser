import {AfterViewInit, Component} from '@angular/core';
import {EventService} from "../services/event.service";
import {DiagramStateService} from "../services/diagram-state.service";
import {Event} from "../model/event.model";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@Component({
  selector: 'cr-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
@UntilDestroy()
export class DetailsComponent implements AfterViewInit {

  obj!: Event;

  constructor(private eventService: EventService, private state: DiagramStateService) {
  }

  ngAfterViewInit(): void {
    this.eventService.selectedObj$.pipe(untilDestroyed(this)).subscribe(event => {
      this.obj = event;
    });
  }

}
