import { Component, OnInit } from '@angular/core';
import { ApiRequest } from 'src/app/core/api/api-therapeutick-studio';
import { ClientsService } from 'src/app/core/services/clients.service';
import { ProceduresService } from 'src/app/core/services/procedures.service';
import { SchedulersService } from 'src/app/core/services/schedulers.service';

@Component({
  selector: 'app-therapists-manage',
  templateUrl: './therapists-manage.component.html',
  styleUrls: ['./therapists-manage.component.css'],
  providers: [ApiRequest, ClientsService, SchedulersService, ProceduresService]
})
export class TherapistsManageComponent implements OnInit {
  schedulers: ISchedulerModel[];

  procedures: IProcedureModel[];
  amountPrice: number = 0;
  clients: IClientModel[];
  client: IClientModel;

  isLoading: boolean = false;
  isManageDialog: boolean = false;

  constructor(
    private apiRequest: ApiRequest,
    private clientsService: ClientsService,
    private schedulersService: SchedulersService,
    private proceduresService: ProceduresService,
  ) { }

  ngOnInit() {
    this.getClients();
  }


  public editClient(client: IClientModel): void {
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
    this.isManageDialog = !this.isManageDialog;

    this.getClients();
  }

  private save(client: IClientModel) {
    this.clientsService.updateClient(client.id, client)
      .subscribe(data => {

      });
  }
}
