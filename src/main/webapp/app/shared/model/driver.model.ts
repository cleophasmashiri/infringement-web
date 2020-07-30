import { IVehicle } from 'app/shared/model/vehicle.model';

export interface IDriver {
  id?: number;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
  nationalIdNumber?: string;
  cellNumber?: string;
  province?: string;
  city?: string;
  suburb?: string;
  streetName?: string;
  streetPropertyNumber?: string;
  unitNumber?: string;
  vehicles?: IVehicle[];
}

export class Driver implements IDriver {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public middleName?: string,
    public email?: string,
    public nationalIdNumber?: string,
    public cellNumber?: string,
    public province?: string,
    public city?: string,
    public suburb?: string,
    public streetName?: string,
    public streetPropertyNumber?: string,
    public unitNumber?: string,
    public vehicles?: IVehicle[]
  ) {}
}
