import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Observable, tap} from "rxjs";
import {EhldService} from "../services/ehld.service";
import {DomSanitizer} from "@angular/platform-browser";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {DiagramStateService} from "../services/diagram-state.service";
import {Router} from "@angular/router";


@Component({
  selector: 'cr-ehld',
  templateUrl: './ehld.component.html',
  styleUrls: ['./ehld.component.scss']
})

@UntilDestroy()
export class EhldComponent implements AfterViewInit {

  @ViewChild('ehld') ehldContainer?: ElementRef<HTMLDivElement>;
  @Input('id') diagramId: string = '';

  hasEHLD: boolean = false;
  svgContent: string = '';
  selectedElement: SVGGElement | undefined = undefined;
  selectedIdFromUrl = '';
  stIdToSVGGElement: Map<string, SVGGElement> = new Map<string, SVGGElement>();

  constructor(private ehldService: EhldService,
              private sanitizer: DomSanitizer,
              private cdr: ChangeDetectorRef,
              private stateService: DiagramStateService,
              private router: Router,) {
  }

  selecting = this.stateService.onChange.select$.pipe(
    tap(value => this.selectedIdFromUrl = value))
    .subscribe();

  ngAfterViewInit(): void {

    this.ehldService.hasEHLD$.pipe(untilDestroyed(this)).subscribe((hasEHLD) => {
      this.hasEHLD = hasEHLD;
      if (this.diagramId && this.hasEHLD) {
        // todo remove log message
        this.loadEhldSvg().subscribe({
          next: () => {
            console.log('EHLD SVG loaded successfully.');
          },
          error: () => {
            console.error('Error loading EHLD SVG');
          }
        })
      }
    });

  }

  private loadEhldSvg(): Observable<string> {
    return this.ehldService.getEHLDSvg(this.diagramId).pipe(
      tap(svgContent => {
        if (svgContent) {
          const sanitizedSvg = this.sanitizer.bypassSecurityTrustHtml(svgContent);
          this.svgContent = sanitizedSvg as string;

          if (this.svgContent) {
            this.cdr.detectChanges();
            this.addEventListenerToSvg();
            // set initial selection element
            this.stIdToSVGGElement = this.ehldService.setStIdToSVGGElementMap(this.ehldContainer);
            this.selectedElement = this.stIdToSVGGElement.get(this.selectedIdFromUrl)
            if (this.selectedElement) {
              this.ehldService.applyOutline(this.selectedElement);
            }
          }
        } else {
          throw new Error('Error loading EHLD SVG');
        }
      })
    )
  }


  private addEventListenerToSvg(): void {
    const svgElement = this.ehldContainer!.nativeElement.querySelectorAll('g[id^="REGION"]') as NodeListOf<SVGGElement>;

    svgElement.forEach((element: SVGGElement) => {
      element.addEventListener('mouseover', () => {
        if (element !== this.selectedElement) {
          this.ehldService.applyShadow(element);
        }
      })

      element.addEventListener('mouseout', () => {
        if (element !== this.selectedElement) {
          this.ehldService.removeShadow(element);
        }
      })

      element.addEventListener('click', () => {
        if (this.selectedElement) {
          this.ehldService.removeOutline(this.selectedElement);
        }
        this.selectedElement = element;

        const idAttr = this.selectedElement?.getAttribute('id');
        if (idAttr) {
          const stId = this.ehldService.getStableId(idAttr);
          if (stId) this.stateService.set('select', stId);
        }

        this.ehldService.applyOutline(element);
        console.log('SVG selected');
      });

    })
  }

}
