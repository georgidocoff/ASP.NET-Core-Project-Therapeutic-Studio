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

  constructor(
    private proceduresService: ProceduresService,
  ) { }

  ngOnInit() {
    this.proceduresService.getProcedures()
      .subscribe(res => {
        this.procedures = res;
      });
  }

}
