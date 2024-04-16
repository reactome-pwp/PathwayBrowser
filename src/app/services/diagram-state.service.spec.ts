import { TestBed } from '@angular/core/testing';

import { DiagramStateService } from './diagram-state.service';

describe('BrowserStateServiceService', () => {
  let service: DiagramStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiagramStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
