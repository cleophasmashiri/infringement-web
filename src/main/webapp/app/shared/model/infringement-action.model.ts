import { Moment } from 'moment';
import { IInfringement } from 'app/shared/model/infringement.model';
import { InfringementActionType } from 'app/shared/model/enumerations/infringement-action-type.model';

export interface IInfringementAction {
  id?: number;
  processInstanceId?: string;
  notes?: string;
  infringementActionType?: InfringementActionType;
  dateDone?: Moment;
  doneBy?: string;
  infringement?: IInfringement;
  amount?: number;
  points?: number;
}

export class InfringementAction implements IInfringementAction {
  constructor(
    public id?: number,
    public processInstanceId?: string,
    public notes?: string,
    public infringementActionType?: InfringementActionType,
    public dateDone?: Moment,
    public doneBy?: string,
    public infringement?: IInfringement,
    public amount?: number,
    public points?: number
  ) {}
}
