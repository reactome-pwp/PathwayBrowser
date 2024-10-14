import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
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

  constructor(private http: HttpClient, private ehldService: EhldService, private sanitizer: DomSanitizer, private renderer: Renderer2,
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
              this.addHoverListenerToSvg();
            }

          } else {
            console.error('Error loading EHLD SVG');
          }
        })
      )
  }


  private addHoverListenerToSvg(): void {
    const svgElement = this.ehldContainer!.nativeElement.querySelectorAll('g[id^="REGION"]') as NodeListOf<SVGGElement>;


    svgElement.forEach((element: SVGGElement) => {
      element.addEventListener('mouseover', () => {
        this.applyShadow(element);
        console.log('SVG hover detected');
      })

      element.addEventListener('mouseout', () => {
        this.removeShadow(element);
        console.log('SVG hover ended');
      })
    })
  }

  applyShadow(svgElement: SVGGElement,) {
    const filterId = 'hoveringFilter';
    const svgNameSpace = 'http://www.w3.org/2000/svg';

    // Check if the filter already exists; if not, create it
    let existingFilter = document.getElementById(filterId);
    if (!existingFilter) {
      // Create the filter element
      const filter = this.renderer.createElement('filter', svgNameSpace);
      filter.setAttribute('id', filterId);
      filter.setAttribute('x', '0');
      filter.setAttribute('y', '0');

      // Create the feDropShadow element
      const dropShadow = this.renderer.createElement('feDropShadow', svgNameSpace);
      dropShadow.setAttribute('dx', '0'); // X offset
      dropShadow.setAttribute('dy', '0'); // Y offset
      dropShadow.setAttribute('stdDeviation', '7'); // Blur amount
      dropShadow.setAttribute('flood-color', '#006782'); // Shadow color, primary
      dropShadow.setAttribute('flood-opacity', '0.8');

      // Append the feDropShadow to the filter
      this.renderer.appendChild(filter, dropShadow);

      // Append the filter to the SVG element
      const svgParent = svgElement.closest('svg');
      const defs = svgParent!.querySelector('defs')
      if (defs) {
        this.renderer.appendChild(defs, filter);
      }
    }
    // Apply the filter to the SVG element
    svgElement.style.filter = `url(#${filterId})`;
  }

  removeShadow(svgElement: SVGGElement): void {
    svgElement.style.filter = 'none';
  }

}
