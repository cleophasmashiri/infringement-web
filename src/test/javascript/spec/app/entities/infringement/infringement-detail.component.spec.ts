import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InfringementwebTestModule } from '../../../test.module';
import { InfringementDetailComponent } from 'app/entities/infringement/infringement-detail.component';
import { Infringement } from 'app/shared/model/infringement.model';

describe('Component Tests', () => {
  describe('Infringement Management Detail Component', () => {
    let comp: InfringementDetailComponent;
    let fixture: ComponentFixture<InfringementDetailComponent>;
    const route = ({ data: of({ infringement: new Infringement(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [InfringementwebTestModule],
        declarations: [InfringementDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(InfringementDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(InfringementDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load infringement on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.infringement).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
