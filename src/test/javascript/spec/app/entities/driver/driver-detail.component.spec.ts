import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InfringementwebTestModule } from '../../../test.module';
import { Driver } from 'app/shared/model/driver.model';
import { DriverDetailComponent } from 'app/infringements/entities/driver/driver-detail.component';

describe('Component Tests', () => {
  describe('Driver Management Detail Component', () => {
    let comp: DriverDetailComponent;
    let fixture: ComponentFixture<DriverDetailComponent>;
    const route = ({ data: of({ driver: new Driver(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [InfringementwebTestModule],
        declarations: [DriverDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DriverDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DriverDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load driver on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.driver).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
