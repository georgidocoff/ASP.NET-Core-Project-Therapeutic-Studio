import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { TherapistModel } from "src/app/shared/Models/TherapistModel";
import { ProcedureModel } from "src/app/shared/Models/ProcedureModel";


@Injectable()
export class ApiRequest {

    constructor(
        private http: HttpClient,
    ) { }

    public createTherapist(therapist: ITherapistModel): Observable<ITherapistModel> {
        let httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        
        return this.http
            .post<any>(environment.url + '/api/therapists', therapist, httpOptions)
            .pipe(
                tap((therapist: any) =>
                    console.log(`added therarapist = ${therapist.id}`
                    )),
                catchError(async () => console.error())
            );
    }

    public getTherapist(){
      return  this.http
            .get<TherapistModel[]>(`${environment.url}` + '/api/therapists');
    }

    public createProcedure(procedure: IProcedureModel): Observable<IProcedureModel> {
        let httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

        return this.http
            .post<any>(environment.url + '/api/procedures', procedure, httpOptions)
            .pipe(
                tap((procedure: any) =>
                    console.log(`added therarapist = ${procedure.id}`
                    )),
                catchError(async () => console.error())
            );
    }

    public getProcedures(){
        return  this.http
              .get<ProcedureModel[]>(`${environment.url}` + '/api/procedures');
      }
}