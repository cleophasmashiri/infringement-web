import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IInfringement } from 'app/shared/model/infringement.model';

type EntityResponseType = HttpResponse<IInfringement>;
type EntityArrayResponseType = HttpResponse<IInfringement[]>;

@Injectable({ providedIn: 'root' })
export class InfringementService {
  public resourceUrl = SERVER_API_URL + 'api/infringements';

  constructor(protected http: HttpClient) {}

  create(infringement: IInfringement): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(infringement);
    return this.http
      .post<IInfringement>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(infringement: IInfringement): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(infringement);
    return this.http
      .put<IInfringement>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IInfringement>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IInfringement[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(infringement: IInfringement): IInfringement {
    const copy: IInfringement = Object.assign({}, infringement, {
      dateDone: infringement.dateDone && infringement.dateDone.isValid() ? infringement.dateDone.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateDone = res.body.dateDone ? moment(res.body.dateDone) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((infringement: IInfringement) => {
        infringement.dateDone = infringement.dateDone ? moment(infringement.dateDone) : undefined;
      });
    }
    return res;
  }
}
