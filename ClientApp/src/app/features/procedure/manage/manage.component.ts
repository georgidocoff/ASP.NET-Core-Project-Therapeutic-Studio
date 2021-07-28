import { Component, OnInit } from '@angular/core';

import { ApiRequest } from '../../../core/api/api-therapeutick-studio';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
  providers: [ApiRequest]
})
export class ManageComponent implements OnInit {
  procedures: IProcedureModel[];

  constructor(
    private apiRequest: ApiRequest,
  ) { }

  ngOnInit() {
    this.apiRequest.getProcedures().subscribe(res => {
      this.procedures = res;
    });
  }

}
