import {TestBed} from '@angular/core/testing';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';

import {legacyGuard} from './legacy.guard';
import {RouterTestingModule} from "@angular/router/testing";
import {DiagramStateService} from "../services/diagram-state.service";
import {DiagramComponent} from "../diagram/diagram.component";


describe('legacyGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => legacyGuard(...guardParameters));

  let router: Router;
  let state: DiagramStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {path: ':id', component: DiagramComponent}
        ]),
      ],
    });

    router = TestBed.inject(Router);
    state = TestBed.inject(DiagramStateService);
  });

  it('should be convert legacy url to new one', async () => {
    const navigateSpy = spyOn(router, 'navigate').and.callThrough();

    const urlTree = router.parseUrl('/#/R-HSA-5637815&SEL=R-HSA-109797&FLG=R-HSA-1637910&FLGINT');
    const route = {...urlTree} as unknown as ActivatedRouteSnapshot;
    await executeGuard(route, {} as RouterStateSnapshot)
    expect(navigateSpy).toHaveBeenCalledWith(
      ['R-HSA-5637815'],
      {
        fragment: undefined,
        queryParams: {
          SEL: 'R-HSA-109797',
          FLG: 'R-HSA-1637910',
          FLGINT: true
        }
      }
    );

    setTimeout(() => {
      expect(state.get('select')).toEqual(['R-HSA-109797']);
      expect(state.get('flag')).toEqual(['R-HSA-1637910']);
      expect(state.get('flagInteractors')).toEqual(true);
    })
  });
});

