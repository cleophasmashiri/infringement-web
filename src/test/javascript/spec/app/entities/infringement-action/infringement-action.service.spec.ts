import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { InfringementActionService } from 'app/entities/infringement-action/infringement-action.service';
import { IInfringementAction, InfringementAction } from 'app/shared/model/infringement-action.model';
import { InfringementActionType } from 'app/shared/model/enumerations/infringement-action-type.model';

describe('Service Tests', () => {
  describe('InfringementAction Service', () => {
    let injector: TestBed;
    let service: InfringementActionService;
    let httpMock: HttpTestingController;
    let elemDefault: IInfringementAction;
    let expectedResult: IInfringementAction | IInfringementAction[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(InfringementActionService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new InfringementAction(0, 'AAAAAAA', 'AAAAAAA', InfringementActionType.CREATED_INFRINGEMENT, currentDate, 'AAAAAAA');
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

      it('should create a InfringementAction', () => {
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

        service.create(new InfringementAction()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a InfringementAction', () => {
        const returnedFromService = Object.assign(
          {
            processInstanceId: 'BBBBBB',
            notes: 'BBBBBB',
            infringementActionType: 'BBBBBB',
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

      it('should return a list of InfringementAction', () => {
        const returnedFromService = Object.assign(
          {
            processInstanceId: 'BBBBBB',
            notes: 'BBBBBB',
            infringementActionType: 'BBBBBB',
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

      it('should delete a InfringementAction', () => {
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
