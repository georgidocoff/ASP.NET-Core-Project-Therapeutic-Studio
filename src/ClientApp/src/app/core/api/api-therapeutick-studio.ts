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
                    (`added therarapist = ${therapist.id}`
                    )),
                catchError(async () => console.error())
            );
    }

    public getTherapist() {
        return this.http
            .get<TherapistModel[]>(`${environment.url}` + '/api/therapists');
    }

    public updateTherapist(id: number, therapistModel: ITherapistModel): Observable<ITherapistModel> {
        let httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

        return this.http.patch<ITherapistModel>(`${environment.url}` + `/api/therapists/update/${id}`, therapistModel, httpOptions)
            .pipe(
                tap((therapistModel: any) =>
                    (`update therapist = ${id}`
                    )),
                catchError(async () => console.error())
            );
    }

    public deleteTherapist(therapistId: number) {
        this.http.delete(environment.url + `/api/therapists/delete/${therapistId}`)
            .subscribe({
                next: data => {
                    ('Delete successful');
                },
                error: error => {
                    console.error('There was an error!', error);
                }
            });
    }

    public createProcedure(procedure: IProcedureModel): Observable<IProcedureModel> {
        let httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

        return this.http
            .post<any>(environment.url + '/api/procedures', procedure, httpOptions)
            .pipe(
                tap((procedure: any) =>
                    (`added procedure = ${procedure.id}`
                    )),
                catchError(async () => console.error())
            );
    }

    public getProcedures() {
        return this.http
            .get<ProcedureModel[]>(`${environment.url}` + '/api/procedures');
    }

    public updateProcedure(id: number, procedureModel: IProcedureModel): Observable<IProcedureModel> {
        let httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

        return this.http.patch<IProcedureModel>(`${environment.url}` + `/api/procedures/update/${id}`, procedureModel, httpOptions)
            .pipe(
                tap((procedureModel: any) =>
                    (`update procedure = ${id}`
                    )),
                catchError(async () => console.error())
            );
    }

    public deleteProcedure(procedureId: number) {
        this.http.delete(environment.url + `/api/procedures/delete/${procedureId}`)
            .subscribe({
                next: data => {
                    ('Delete successful');
                },
                error: error => {
                    console.error('There was an error!', error);
                }
            });
    }

    public createClient(client: IClientModel): Observable<IClientModel> {
        let httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

        return this.http
            .post<any>(environment.url + '/api/clients', client, httpOptions)
            .pipe(
                tap((client: any) =>
                    (`added client = ${client.id}`
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
                    (`update client = ${id}`
                    )),
                catchError(async () => console.error())
            );
    }

    public deleteClient(clientId: string) {
        this.http.delete(environment.url + `/api/clients/delete/${clientId}`)
            .subscribe({
                next: data => {
                    ('Delete successful');
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
                    (`added scheduler = ${scheduler.id}`
                    )),
                catchError(async () => console.error())
            );
    }

    public getSchedulers(currentDate, hour) {
        return this.http
            .get<ISchedulerModel[]>(`${environment.url}` + `/api/schedulers/?searchedDate=${currentDate}&hour=${hour}`);
    }

    public getSchedulersClients(clientId: string) {
        return this.http
            .get<ISchedulerModel[]>(`${environment.url}` + `/api/schedulers/client/?clientId=${clientId}`);
    }

    public updateScheduler(id: string, schedulerModel: ISchedulerModel): Observable<ISchedulerModel> {
        let httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

        return this.http.patch<ISchedulerModel>(`${environment.url}` + `/api/schedulers/update/${id}`, schedulerModel, httpOptions)
            .pipe(
                tap((schedulerModel: any) =>
                    (`update scheduler = ${id}`
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
                    (`added payment = ${payment.id}`
                    )),
                catchError(async () => console.error())
            );
    }

    public getPayments() {
        return this.http
            .get<IPaymentModel[]>(`${environment.url}` + '/api/payments');
    }

    public getPaymentsByDate(current: string) {
        return this.http
            .get<IPaymentModel[]>(`${environment.url}` + `/api/payments/date/?current=${current}`);
    }
}