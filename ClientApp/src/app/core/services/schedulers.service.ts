import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRequest } from '../api/api-therapeutick-studio';

@Injectable({
  providedIn: 'root'
})
export class SchedulersService {

  constructor(
    private apiRequest: ApiRequest,
  ) { }

  public getClients(clientId: string): Observable<ISchedulerModel[]> {
    return this.apiRequest.getSchedulersClients(clientId);
  }
}
