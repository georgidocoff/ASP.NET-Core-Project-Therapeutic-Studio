import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { AppConstants } from '../../shared/app-constan'
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";


@Injectable()
export class ApiRequest {

    constructor(
        private http: HttpClient,
    ) { }

    public createTherapist(therapist: ITherapistModel): Observable<ITherapistModel> {
        let httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        const baseUrl = `${environment.url}` + '/api/therapists';
        return this.http
            .post<any>(environment.url + '/api/therapists', therapist, httpOptions)
            .pipe(
                tap((therapist: any) =>
                    console.log(`added therarapist = ${therapist.id}`
                    )),
                catchError(async () => console.error())
            );
    }
}