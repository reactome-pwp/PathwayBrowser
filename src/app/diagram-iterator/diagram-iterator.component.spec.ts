import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramIteratorComponent } from './diagram-iterator.component';

describe('DiagramIteratorComponent', () => {
  let component: DiagramIteratorComponent;
  let fixture: ComponentFixture<DiagramIteratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiagramIteratorComponent]
    });
    fixture = TestBed.createComponent(DiagramIteratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
