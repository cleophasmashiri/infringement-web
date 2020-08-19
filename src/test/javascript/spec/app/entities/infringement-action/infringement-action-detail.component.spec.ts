import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InfringementwebTestModule } from '../../../test.module';
import { InfringementAction } from 'app/shared/model/infringement-action.model';
import { InfringementActionDetailComponent } from 'app/infringements/entities/infringement-action/infringement-action-detail.component';

describe('Component Tests', () => {
  describe('InfringementAction Management Detail Component', () => {
    let comp: InfringementActionDetailComponent;
    let fixture: ComponentFixture<InfringementActionDetailComponent>;
    const route = ({ data: of({ infringementAction: new InfringementAction(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [InfringementwebTestModule],
        declarations: [InfringementActionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(InfringementActionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(InfringementActionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load infringementAction on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.infringementAction).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
