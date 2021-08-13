import { Component, OnInit } from '@angular/core';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { ClientsService } from 'src/app/core/services/clients.service';
import { MessagesService } from 'src/app/core/services/messages.service';

import { ApiRequest } from '../../../core/api/api-therapeutick-studio';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
  providers: [ApiRequest, ClientsService, AlertConfig]
})
export class ManageComponent implements OnInit {
  clients: IClientModel[];
  client: IClientModel;
  index: number;

  isDeleteDialog: boolean = false;
  isManageDialog: boolean = false;
  isLoading: boolean = false;
  alerts: IAlertModel[] = [];

  constructor(
    private apiRequest: ApiRequest,
    private clientsService: ClientsService,
    private messages: MessagesService,
  ) { }

  ngOnInit() {
    this.getClients();
  }

  public editClient(client: IClientModel): void {
    this.isLoading = false;

    this.isManageDialog = !this.isManageDialog;
    this.client = { ...client };

    setTimeout(() => {
      this.isLoading = true;
    }, 300);
  }

  private cancel() {
    this.isLoading = false;
    this.isManageDialog = !this.isManageDialog;

    this.getClients();
  }

  private save(client: IClientModel) {
    this.isLoading = false;
    this.clientsService.updateClient(client.id, client)
      .subscribe(data => {
        this.isManageDialog = !this.isManageDialog;

        this.message('update', client);

        this.getClients();
      });
  }

  public deleteClient(client: IClientModel, index: number): void {
    this.isDeleteDialog = true;
    if (!client) {
      throw Error('The client value is incorect')
    }

    this.message('warning', client);
    this.client = client;
    this.index = index;

    setTimeout(() => {
      this.isLoading = true;
    }, 300);

  }

  private confirm(): void {
    if (!this.client || !this.index) {
      throw Error('The value of client is invalid.')
    }

    this.clientsService.deleteClient(this.client.id);

    this.clients.splice(this.index, 1);
    this.message('delete', this.client);

    setTimeout(() => {
      
      this.getClients();
    }, 100);
    this.isDeleteDialog = !this.isDeleteDialog;
  }

  private decline(): void {
    this.isDeleteDialog = !this.isDeleteDialog;
  }
  private getClients(): void {
    this.clientsService.getClients()
      .subscribe(data => {
        this.clients = data;

        setTimeout(() => {
          this.isLoading = true;
        }, 300);
      });
  }

  private message(type: string, client: IClientModel): void {
    this.alerts.push(this.messages
      .get(type, `${client.firstName} ${client.lastName}`));
  }
}
