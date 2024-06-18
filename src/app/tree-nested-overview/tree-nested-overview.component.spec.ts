import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeNestedOverviewComponent } from './tree-nested-overview.component';

describe('TreeNestedOverviewComponent', () => {
  let component: TreeNestedOverviewComponent;
  let fixture: ComponentFixture<TreeNestedOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreeNestedOverviewComponent]
    });
    fixture = TestBed.createComponent(TreeNestedOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
