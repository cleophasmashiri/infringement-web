import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { InfringementwebTestModule } from '../../../test.module';
import { Infringement } from 'app/shared/model/infringement.model';
import { InfringementUpdateComponent } from 'app/infringements/entities/infringement/infringement-update.component';
import { InfringementService } from 'app/infringements/entities/infringement/infringement.service';

describe('Component Tests', () => {
  describe('Infringement Management Update Component', () => {
    let comp: InfringementUpdateComponent;
    let fixture: ComponentFixture<InfringementUpdateComponent>;
    let service: InfringementService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [InfringementwebTestModule],
        declarations: [InfringementUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(InfringementUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InfringementUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InfringementService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Infringement(123);
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
        const entity = new Infringement();
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
