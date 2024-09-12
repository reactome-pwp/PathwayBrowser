import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramHomeComponent } from './diagram-home.component';

describe('DiagramHomeComponent', () => {
  let component: DiagramHomeComponent;
  let fixture: ComponentFixture<DiagramHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiagramHomeComponent]
    });
    fixture = TestBed.createComponent(DiagramHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
