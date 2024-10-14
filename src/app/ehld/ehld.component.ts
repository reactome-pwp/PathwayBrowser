import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Observable, tap} from "rxjs";
import {EhldService} from "../services/ehld.service";
import {DomSanitizer} from "@angular/platform-browser";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";


@Component({
  selector: 'cr-ehld',
  templateUrl: './ehld.component.html',
  styleUrls: ['./ehld.component.scss']
})

@UntilDestroy()
export class EhldComponent implements AfterViewInit {

  @ViewChild('ehld') ehldContainer?: ElementRef<HTMLDivElement>;
  @Input() diagramId: string = '';

  hasEHLD: boolean = false;
  svgContent: string = '';
  private selectedElement: SVGGElement | null = null;

  constructor(private ehldService: EhldService,
              private sanitizer: DomSanitizer,
              private cdr: ChangeDetectorRef) {
  }


  ngAfterViewInit(): void {


    this.ehldService.hasEHLD$.pipe(untilDestroyed(this)).subscribe((hasEHLD) => {
      this.hasEHLD = hasEHLD;
      if (this.diagramId && this.hasEHLD) {
        // this.clearSvgContent();
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
          }
        } else {
          console.error('Error loading EHLD SVG');
        }
      })
    )
  }


  private addEventListenerToSvg(): void {
    const svgElement = this.ehldContainer!.nativeElement.querySelectorAll('g[id^="REGION"]') as NodeListOf<SVGGElement>;

    svgElement.forEach((element: SVGGElement) => {
      element.addEventListener('mouseover', () => {
        console.log('SVG hover detected');
        if (element !== this.selectedElement) {
          this.ehldService.applyShadow(element);
        }

      })

      element.addEventListener('mouseout', () => {
        console.log('SVG hover ended');
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
          console.log("stId ", stId)
        }

        this.ehldService.applyOutline(element);
        console.log('SVG selected');
      });

    })
  }

}
