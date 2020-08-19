import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IInfringement, Infringement } from 'app/shared/model/infringement.model';
import { InfringementService } from 'app/infringements/entities/infringement/infringement.service';

describe('Service Tests', () => {
  describe('Infringement Service', () => {
    let injector: TestBed;
    let service: InfringementService;
    let httpMock: HttpTestingController;
    let elemDefault: IInfringement;
    let expectedResult: IInfringement | IInfringement[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(InfringementService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Infringement(0, 'AAAAAAA', 'AAAAAAA', currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateDone: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Infringement', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateDone: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateDone: currentDate,
          },
          returnedFromService
        );

        service.create(new Infringement()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Infringement', () => {
        const returnedFromService = Object.assign(
          {
            processInstanceId: 'BBBBBB',
            infringementType: 'BBBBBB',
            dateDone: currentDate.format(DATE_TIME_FORMAT),
            doneBy: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateDone: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Infringement', () => {
        const returnedFromService = Object.assign(
          {
            processInstanceId: 'BBBBBB',
            infringementType: 'BBBBBB',
            dateDone: currentDate.format(DATE_TIME_FORMAT),
            doneBy: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateDone: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Infringement', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
