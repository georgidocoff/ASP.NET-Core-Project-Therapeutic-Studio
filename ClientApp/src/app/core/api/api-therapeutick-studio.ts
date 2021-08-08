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

    public getTherapist() {
        return this.http
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
                    console.log(`added procedure = ${procedure.id}`
                    )),
                catchError(async () => console.error())
            );
    }

    public getProcedures() {
        return this.http
            .get<ProcedureModel[]>(`${environment.url}` + '/api/procedures');
    }

    public createClient(client: IClientModel): Observable<IClientModel> {
        let httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

        return this.http
            .post<any>(environment.url + '/api/clients', client, httpOptions)
            .pipe(
                tap((client: any) =>
                    console.log(`added client = ${client.id}`
                    )),
                catchError(async () => console.error())
            );
    }

    public getClients() {
        return this.http
            .get<IClientModel[]>(`${environment.url}` + '/api/clients');
    }

    public updateClient(id: string, clientModel: IClientModel): Observable<IClientModel> {
        let httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

        return this.http.patch<IClientModel>(`${environment.url}` + `/api/clients/update/${id}`, clientModel, httpOptions)
            .pipe(
                tap((clientModel: any) =>
                    console.log(`update client = ${id}`
                    )),
                catchError(async () => console.error())
            );
    }

    public deleteClient(clientId:string){
        this.http.delete(environment.url + `/api/clients/delete/${clientId}`)
        .subscribe({
            next: data => {
                console.log('Delete successful');
            },
            error: error => {
                console.error('There was an error!', error);
            }
        });
    }

    public createScheduler(scheduler: ISchedulerModel): Observable<ISchedulerModel> {
        let httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

        return this.http
            .post<any>(environment.url + '/api/schedulers', scheduler, httpOptions)
            .pipe(
                tap((scheduler: any) =>
                    console.log(`added scheduler = ${scheduler.id}`
                    )),
                catchError(async () => console.error())
            );
    }

    public getSchedulers(currentDate, hour) {
        return this.http
            .get<ISchedulerModel[]>(`${environment.url}` + `/api/schedulers/?searchedDate=${currentDate}&hour=${hour}`);
    }

    public getSchedulersClients(clientId:string) {
        return this.http
            .get<IClientModel[]>(`${environment.url}` + `api/schedulers/clients/?clientId=${clientId}`);
    }

    public updateScheduler(id: string, schedulerModel: ISchedulerModel): Observable<ISchedulerModel> {
        let httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

        return this.http.patch<ISchedulerModel>(`${environment.url}` + `/api/schedulers/update/${id}`, schedulerModel, httpOptions)
            .pipe(
                tap((schedulerModel: any) =>
                    console.log(`update scheduler = ${id}`
                    )),
                catchError(async () => console.error())
            );
    }

    public createPayment(payment: IPaymentModel, schedulerId: string): Observable<IPaymentModel> {
        let httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

        return this.http
            .post<any>(environment.url + `/api/payments/?schedulerId=${schedulerId}`, payment, httpOptions)
            .pipe(
                tap((payment: any) =>
                    console.log(`added payment = ${payment.id}`
                    )),
                catchError(async () => console.error())
            );
    }

    public getPayments() {
        return this.http
            .get<IPaymentModel[]>(`${environment.url}` + '/api/payments');
    }
}