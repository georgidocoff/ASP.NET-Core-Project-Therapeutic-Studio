import { Component, OnInit } from '@angular/core';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { ApiRequest } from 'src/app/core/api/api-therapeutick-studio';
import { MessagesService } from 'src/app/core/services/messages.service';
import { ProceduresService } from 'src/app/core/services/procedures.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
  providers: [ApiRequest, ProceduresService, AlertConfig]
})

export class ManageComponent implements OnInit {
  procedures: IProcedureModel[];
  procedure: IProcedureModel;
  index: number;

  isDeleteDialog: boolean = false;;
  isManageDialog: boolean = false;
  isLoading: boolean = false;
  alerts: IAlertModel[] = [];

  constructor(
    private proceduresService: ProceduresService,
    private messages: MessagesService,
  ) { }

  ngOnInit() {
    this.getProcedures();
  }

  public editProcedure(procedure: IProcedureModel): void {
    this.isLoading = false;

    this.isManageDialog = !this.isManageDialog;
    this.procedure = { ...procedure };

    setTimeout(() => {
      this.isLoading = true;
    }, 300);

    this.message('update', procedure);
  }

  private cancel() {
    this.isLoading = false;
    this.isManageDialog = !this.isManageDialog;

    this.getProcedures();
  }

  private save(procedure: IProcedureModel) {
    this.isLoading = false;
    this.proceduresService.updateProcedure(procedure.id, procedure)
      .subscribe(data => {
        this.isManageDialog = !this.isManageDialog;

        this.getProcedures();
      });
  }

  public deleteProcedure(procedure: IProcedureModel, index: number): void {
    this.isDeleteDialog = true;

    if (!procedure) {
      throw Error('The procedure value is incorect')
    }

    this.message('warning', procedure);

    this.procedure = procedure;
    this.index = index;
  }

  private confirm(): void {
    if (!this.procedure || !this.index) {
      throw Error('The value of client is invalid.')
    }
    this.proceduresService.deleteProcedure(this.procedure.id);

    this.procedures.splice(this.index, 1);

    this.message('delete', this.procedure);

    setTimeout(() => {
      
      this.getProcedures();
    }, 100);
    this.isDeleteDialog = !this.isDeleteDialog;
  }

  private decline(): void {
    this.isDeleteDialog = !this.isDeleteDialog;
  }
  private getProcedures(): void {
    this.proceduresService.getProcedures()
      .subscribe(res => {
        this.procedures = res;

        setTimeout(() => {
          this.isLoading = true;
        }, 300);
      });
  }

  private message(type: string, procedure: IProcedureModel): void {
    this.alerts.push(this.messages
      .get(type, `${procedure.name}`));
  }
}
