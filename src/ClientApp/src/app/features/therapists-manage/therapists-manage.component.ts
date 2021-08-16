import { Component, OnInit } from '@angular/core';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { ApiRequest } from 'src/app/core/api/api-therapeutick-studio';
import { ClientsService } from 'src/app/core/services/clients.service';
import { LocalStorageServiceService } from 'src/app/core/services/local-storage-service.service';
import { MessagesService } from 'src/app/core/services/messages.service';
import { ProceduresService } from 'src/app/core/services/procedures.service';
import { SchedulersService } from 'src/app/core/services/schedulers.service';

@Component({
  selector: 'app-therapists-manage',
  templateUrl: './therapists-manage.component.html',
  styleUrls: ['./therapists-manage.component.css'],
  providers: [
    ApiRequest,
    ClientsService,
    SchedulersService,
    ProceduresService,
    AlertConfig,
  ]
})
export class TherapistsManageComponent implements OnInit {
  schedulers: ISchedulerModel[];

  procedures: IProcedureModel[];
  amountPrice: number = 0;
  clients: IClientModel[];
  client: IClientModel;
  index: number;

  isAdmin: boolean = false;
  isLoading: boolean = false;
  isManageDialog: boolean = false;
  isDeleteDialog: boolean = false;

  alerts: IAlertModel[] = [];

  constructor(
    private apiRequest: ApiRequest,
    private storage: LocalStorageServiceService,
    private clientsService: ClientsService,
    private schedulersService: SchedulersService,
    private proceduresService: ProceduresService,
    private messages: MessagesService,
  ) { }

  ngOnInit() {
    this.isAdmin = this.storage.isUserAdmin();
    this.getClients();
  }


  public viewClient(client: IClientModel): void {
    this.isLoading = false;
    this.amountPrice = 0;
    this.isManageDialog = !this.isManageDialog;
    this.client = { ...client };
    this.getProcedures();

    this.apiRequest.getSchedulersClients(client.id)
      .subscribe(data => {
        this.schedulers = data;

        this.schedulers.forEach(scheduler => {
          this.amountPrice += this.procedures[scheduler.procedureId - 1].price;
        });

        setTimeout(() => {

          this.isLoading = true;
        }, 300);
      });

  }

  public deleteClient(client: IClientModel, index: number): void {
    this.alerts = [];
    this.isDeleteDialog = !this.isDeleteDialog;

    if (!client) {
      throw Error('The client value is incorect')
    }

    this.message('warning', client);
    this.client = client;
    this.index = index;
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

  private getSchedulerClient(clientId: string): void {
    this.schedulersService.getClients(clientId)
      .subscribe(data => {
        this.schedulers = data;
        console.log(this.schedulers);
      });
  }

  private getProcedures(): void {
    this.proceduresService.getProcedures()
      .subscribe(data => {
        this.procedures = data;
      });
  }

  private cancel() {
    this.isLoading = false;
    this.isManageDialog = !this.isManageDialog;

    this.getClients();
  }

  private decline(): void {
    this.isDeleteDialog = !this.isDeleteDialog;
  }

  private confirm(): void {
    if (!this.client || !this.index) {
      throw Error('The value of client is invalid.')
    }

    this.clientsService.deleteClient(this.client.id);

    this.clients.splice(this.index, 1);

    setTimeout(() => {

      this.getClients();
    }, 100);
    this.isDeleteDialog = !this.isDeleteDialog;
  }

  private save(client: IClientModel) {
    this.alerts = [];
    this.isLoading = false;

    this.clientsService.updateClient(client.id, client)
      .subscribe({
        next: () => {
          this.isLoading = true;

          this.message('update', client);

          this.getClients();
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  private message(type: string, client: IClientModel): void {
    this.alerts.push(this.messages
      .get(type, `${client.firstName} ${client.lastName}`));
  }
}
