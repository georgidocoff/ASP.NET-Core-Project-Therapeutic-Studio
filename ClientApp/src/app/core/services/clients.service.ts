import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRequest } from '../api/api-therapeutick-studio';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  clients: IClientModel[];

  constructor(
    private apiRequest: ApiRequest,
  ) { }

  public getClients(): Observable<IClientModel[]> {
    return this.apiRequest.getClients();
  }

  public importClientFullname(clients: IClientModel[]) {
    let clientsExtend: string[] = [];
    // let query = event.query;
    for (let i = 0; i < clients.length; i++) {
      let client = clients[i];

      //TODO find better way to remove clinet middleName null value

      if (client.middleName != null) {
        client.fullName = client.firstName + ' ' + client.middleName + ' ' + client.lastName;
      } else {
        client.fullName = client.firstName + ' ' + client.lastName;
      }
      clientsExtend.push(client.fullName);
    }

    return clientsExtend;
  }

  public getClientId(clientFullName: string, clients: IClientModel[]): string {

    const fullName = clientFullName.split(' ');
    const firstName = fullName[0];
    const lastName = fullName[fullName.length - 1];

    let middleName = null;
    if (fullName.length > 2) {
      middleName = fullName[1];
    }

    const result = clients
      .find(x => (x.firstName == firstName
        && x.lastName == lastName
        && x.middleName == middleName));

    return result ? result.id : '';
  }

  public createClient(currClient: IClientModel): Observable<IClientModel> {
    return this.apiRequest.createClient(currClient);
  }

  public deleteClient(clientId: string):void{
    this.apiRequest.deleteClient(clientId);
  }
}
