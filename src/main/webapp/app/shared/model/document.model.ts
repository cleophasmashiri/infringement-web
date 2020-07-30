import { IInfringement } from 'app/shared/model/infringement.model';

export interface IDocument {
  id?: number;
  name?: string;
  contentContentType?: string;
  content?: any;
  infringement?: IInfringement;
}

export class Document implements IDocument {
  constructor(
    public id?: number,
    public name?: string,
    public contentContentType?: string,
    public content?: any,
    public infringement?: IInfringement
  ) {}
}
