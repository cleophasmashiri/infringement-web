import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { InfringementwebTestModule } from '../../../test.module';
import { InfringementAction } from 'app/shared/model/infringement-action.model';
import { InfringementActionComponent } from 'app/infringements/entities/infringement-action/infringement-action.component';
import { InfringementActionService } from 'app/infringements/entities/infringement-action/infringement-action.service';

describe('Component Tests', () => {
  describe('InfringementAction Management Component', () => {
    let comp: InfringementActionComponent;
    let fixture: ComponentFixture<InfringementActionComponent>;
    let service: InfringementActionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [InfringementwebTestModule],
        declarations: [InfringementActionComponent],
      })
        .overrideTemplate(InfringementActionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InfringementActionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InfringementActionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new InfringementAction(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.infringementActions && comp.infringementActions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
