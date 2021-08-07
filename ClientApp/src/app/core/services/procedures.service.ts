import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProcedureModel } from 'src/app/shared/Models/ProcedureModel';
import { ApiRequest } from '../api/api-therapeutick-studio';

@Injectable({
  providedIn: 'root'
})
export class ProceduresService {
  procedures: IProcedureModel[];

  constructor(
    private apiRequest: ApiRequest,
  ) { }

  public getProcedureName(name: string, procedures: IProcedureModel[]): IProcedureModel {
    return procedures.find(x => x.name == name);;
  }

  public getProcedures(): Observable<ProcedureModel[]> {
    return this.apiRequest.getProcedures();
  }

  public createProcedure(currProcedure: IProcedureModel): Observable<IProcedureModel> {
    return this.apiRequest.createProcedure(currProcedure);
  }
}
