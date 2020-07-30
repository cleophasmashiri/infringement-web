import { IDriver } from 'app/shared/model/driver.model';

export interface IVehicle {
  id?: number;
  plateNumber?: string;
  make?: string;
  model?: string;
  engineNumber?: string;
  chassisNumber?: string;
  color?: string;
  yearFirstRegistered?: string;
  driver?: IDriver;
}

export class Vehicle implements IVehicle {
  constructor(
    public id?: number,
    public plateNumber?: string,
    public make?: string,
    public model?: string,
    public engineNumber?: string,
    public chassisNumber?: string,
    public color?: string,
    public yearFirstRegistered?: string,
    public driver?: IDriver
  ) {}
}
