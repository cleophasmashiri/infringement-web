import { Moment } from 'moment';
import { IInfringementAction } from 'app/shared/model/infringement-action.model';
import { IDocument } from 'app/shared/model/document.model';
import { IDriver } from 'app/shared/model/driver.model';
import { IVehicle } from 'app/shared/model/vehicle.model';

export interface IInfringement {
  id?: number;
  processInstanceId?: string;
  infringementType?: string;
  dateDone?: Moment;
  doneBy?: string;
  infringementActions?: IInfringementAction[];
  documents?: IDocument[];
  driver?: IDriver;
  vehicle?: IVehicle;
}

export class Infringement implements IInfringement {
  constructor(
    public id?: number,
    public processInstanceId?: string,
    public infringementType?: string,
    public dateDone?: Moment,
    public doneBy?: string,
    public infringementActions?: IInfringementAction[],
    public documents?: IDocument[],
    public driver?: IDriver,
    public vehicle?: IVehicle
  ) {}
}
