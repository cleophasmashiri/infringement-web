import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IInfringementAction } from 'app/shared/model/infringement-action.model';

type EntityResponseType = HttpResponse<IInfringementAction>;
type EntityArrayResponseType = HttpResponse<IInfringementAction[]>;

@Injectable({ providedIn: 'root' })
export class InfringementActionService {
  public resourceUrl = SERVER_API_URL + 'api/infringement-actions';

  constructor(protected http: HttpClient) {}

  create(infringementAction: IInfringementAction): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(infringementAction);
    return this.http
      .post<IInfringementAction>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(infringementAction: IInfringementAction): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(infringementAction);
    return this.http
      .put<IInfringementAction>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IInfringementAction>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IInfringementAction[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(infringementAction: IInfringementAction): IInfringementAction {
    const copy: IInfringementAction = Object.assign({}, infringementAction, {
      dateDone: infringementAction.dateDone && infringementAction.dateDone.isValid() ? infringementAction.dateDone.toJSON() : undefined,
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
      res.body.forEach((infringementAction: IInfringementAction) => {
        infringementAction.dateDone = infringementAction.dateDone ? moment(infringementAction.dateDone) : undefined;
      });
    }
    return res;
  }
}
