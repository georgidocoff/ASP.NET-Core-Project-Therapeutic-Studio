import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRequest } from '../api/api-therapeutick-studio';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  payments: IPaymentModel[];

  constructor(
    private apiRequest: ApiRequest,
  ) { }

  public createPayment(payment: IPaymentModel, schedulerId: string): Observable<IPaymentModel> {
    return this.apiRequest.createPayment(payment, schedulerId)
  }

  public getPaymentsByDate(current: string): Observable<IPaymentModel[]> {
    return this.apiRequest.getPaymentsByDate(current);
  }
}
