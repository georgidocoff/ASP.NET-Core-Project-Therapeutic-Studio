import { Component, OnInit } from '@angular/core';
import { ApiRequest } from 'src/app/core/api/api-therapeutick-studio';
import { ClientsService } from 'src/app/core/services/clients.service';
import { SchedulersService } from 'src/app/core/services/schedulers.service';

@Component({
  selector: 'app-therapists-manage',
  templateUrl: './therapists-manage.component.html',
  styleUrls: ['./therapists-manage.component.css'],
  providers: [ApiRequest, ClientsService, SchedulersService]
})
export class TherapistsManageComponent implements OnInit {
  schedulersClient: IClientModel[];

  clients: IClientModel[];
  client: IClientModel;

  constructor(
    private clientsService: ClientsService,
    private schedulersService: SchedulersService,
  ) { }

  ngOnInit() {
    this.getClients();

  }

  private getClients(): void {
    this.clientsService.getClients()
      .subscribe(data => {
        this.clients = data;
      });
  }

  private getSchedulerClient(clientId: string): void {
    this.schedulersService.getClients(clientId)
      .subscribe(res => {
        this.schedulersClient = res;
      });
  }

  public editClient(client: IClientModel): void {

  }

  public deleteClient(client: IClientModel, index: number): void {
    if (!client) {
      throw Error('The client value is incorect')
    }

    this.clientsService.deleteClient(client.id);

    this.clients.splice(index, 1);
  }
}
