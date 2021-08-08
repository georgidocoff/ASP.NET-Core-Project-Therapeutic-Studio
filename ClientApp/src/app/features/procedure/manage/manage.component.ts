import { Component, OnInit } from '@angular/core';
import { ApiRequest } from 'src/app/core/api/api-therapeutick-studio';
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

  constructor(
    private proceduresService: ProceduresService,
  ) { }

  ngOnInit() {
    this.getProcedures();
  }


  public editProcedure(procedure: IProcedureModel): void {
    this.isManageDialog = !this.isManageDialog;
    this.procedure = { ...procedure };
  }

  private cancel() {
    this.isManageDialog = !this.isManageDialog;

    this.getProcedures();
  }

  private save(procedure: IProcedureModel) {
    this.proceduresService.updateProcedure(procedure.id, procedure)
      .subscribe(data => {
        this.isManageDialog = !this.isManageDialog;

        this.getProcedures();
      });
  }

  public deleteProcedure(procedure: IProcedureModel, index: number): void {
    if (!procedure) {
      throw Error('The procedure value is incorect')
    }

    this.proceduresService.deleteProcedure(procedure.id);

    this.procedures.splice(index, 1);
  }

  private getProcedures(): void {
    this.proceduresService.getProcedures()
      .subscribe(res => {
        this.procedures = res;
      });
  }
}
