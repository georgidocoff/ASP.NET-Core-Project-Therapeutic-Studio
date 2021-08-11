import { Component, OnInit } from '@angular/core';
import { ApiRequest } from 'src/app/core/api/api-therapeutick-studio';
import { MessagesService } from 'src/app/core/services/messages.service';
import { ProceduresService } from 'src/app/core/services/procedures.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
  providers: [ApiRequest, ProceduresService]
})

export class ManageComponent implements OnInit {
  procedures: IProcedureModel[];
  procedure: IProcedureModel;

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
    this.isLoading = false;

    if (!procedure) {
      throw Error('The procedure value is incorect')
    }

    this.proceduresService.deleteProcedure(procedure.id);

    this.procedures.splice(index, 1);

    setTimeout(() => {
      this.isLoading = true;
    }, 300);

    this.message('delete', procedure);
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
