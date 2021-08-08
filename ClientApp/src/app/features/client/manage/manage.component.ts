import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/core/services/clients.service';

import { ApiRequest } from '../../../core/api/api-therapeutick-studio';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
  providers: [ApiRequest, ClientsService]
})
export class ManageComponent implements OnInit {
  clients: IClientModel[];
  client: IClientModel;

  isManageDialog: boolean = false;
  constructor(
    private apiRequest: ApiRequest,
    private clientsService: ClientsService,
  ) { }

  ngOnInit() {
    this.getClients();
  }

  public editClient(client: IClientModel): void {
    this.isManageDialog = !this.isManageDialog;
    this.client = { ...client };
  }

  private cancel() {
    this.isManageDialog = !this.isManageDialog;

    this.getClients();
  }

  private save(client: IClientModel) {
    this.clientsService.updateClient(client.id, client)
      .subscribe(data => {
        this.isManageDialog = !this.isManageDialog;

        this.getClients();
      });
  }

  public deleteClient(client: IClientModel, index: number): void {
    if (!client) {
      throw Error('The client value is incorect')
    }

    this.clientsService.deleteClient(client.id);

    this.clients.splice(index, 1);
  }

  private getClients(): void {
    this.clientsService.getClients()
      .subscribe(data => {
        this.clients = data;
      });
  }
}
