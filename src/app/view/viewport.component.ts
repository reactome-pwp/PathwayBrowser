import {AfterViewInit, Component, ElementRef, NgZone, ViewChild} from '@angular/core';
import {CdkDragMove} from "@angular/cdk/drag-drop";

@Component({
  selector: 'cr-view',
  templateUrl: './viewport.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewportComponent  {
  // @ViewChild('resizeSidebar') resizeBox!: ElementRef;
  // @ViewChild('dragHandleRight') dragHandleRight!: ElementRef;
  // @ViewChild('content') content!: ElementRef;

  //
  // get resizeBoxElement(): HTMLElement {
  //   return this.resizeBox.nativeElement;
  // }
  //
  //
  // get dragHandleRightElement(): HTMLElement {
  //   return this.dragHandleRight.nativeElement;
  // }
  //
  // constructor(private ngZone: NgZone) {
  // }
  //
  // ngAfterViewInit() {
  //   this.setAllHandleTransform();
  // }
  //
  // setAllHandleTransform() {
  //   const rect = this.resizeBoxElement.getBoundingClientRect();
  //   this.setHandleTransform(this.dragHandleRightElement, rect, 'x');
  // }
  //
  // setHandleTransform(dragHandle: HTMLElement, targetRect: DOMRect, position: 'x' | 'y',) {
  //   const dragRect = dragHandle.getBoundingClientRect();
  //   const translateX = targetRect.width - dragRect.width;
  //   const translateY = targetRect.height - dragRect.height;
  //
  //   if (position === 'x') {
  //     dragHandle.style.transform = `translate(${translateX}px, 0)`;
  //   }
  //
  //   if (position === 'y') {
  //     dragHandle.style.transform = `translate(0, ${translateY}px)`;
  //   }
  // }
  //
  // dragMove(dragHandle: HTMLElement, $event: CdkDragMove<any>) {
  //   this.ngZone.runOutsideAngular(() => {
  //     this.resize(dragHandle, this.resizeBoxElement);
  //   });
  // }
  //
  // resize(dragHandle: HTMLElement, target: HTMLElement) {
  //   dragHandle.style.background = 'red';
  //   target.style.background = 'yellow';
  //   const dragRect = dragHandle.getBoundingClientRect();
  //   const targetRect = target.getBoundingClientRect();
  //
  //   const changeWidth = dragRect.left - targetRect.left + dragRect.width;
  //
  //   console.log(dragRect.left, ' ', targetRect.left, ' ', dragRect.width)
  //   console.log('width ' + changeWidth)
  //
  //   const contentWidth = this.content.nativeElement.offsetWidth + changeWidth;
  //   this.content.nativeElement.style.width = contentWidth + 'px';
  //   console.log('content ', contentWidth)
  //
  //   target.style.width = changeWidth + 'px';
  //
  //   this.setAllHandleTransform();
  // }


}
