import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { InfringementwebTestModule } from '../../../test.module';
import { InfringementActionUpdateComponent } from 'app/entities/infringement-action/infringement-action-update.component';
import { InfringementActionService } from 'app/entities/infringement-action/infringement-action.service';
import { InfringementAction } from 'app/shared/model/infringement-action.model';

describe('Component Tests', () => {
  describe('InfringementAction Management Update Component', () => {
    let comp: InfringementActionUpdateComponent;
    let fixture: ComponentFixture<InfringementActionUpdateComponent>;
    let service: InfringementActionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [InfringementwebTestModule],
        declarations: [InfringementActionUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(InfringementActionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InfringementActionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InfringementActionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new InfringementAction(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new InfringementAction();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
