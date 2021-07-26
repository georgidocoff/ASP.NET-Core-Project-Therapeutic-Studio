import { Component, OnInit } from '@angular/core';

import { Infrastructure } from '../../../shared/infrastructure';
import { ApiRequest } from '../../../core/api/api-therapeutick-studio';
import { TherapistModel } from 'src/app/shared/Models/TherapistModel';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
  providers: [Infrastructure, ApiRequest]
})
export class ManageComponent implements OnInit {
  therapists: ITherapistModel[];
  positions: any;
  roles: any;

  constructor(
    private infrastructure: Infrastructure,
    private apiRequest: ApiRequest,
  ) { }

  ngOnInit() {
    this.positions = this.infrastructure.positions;

    this.roles = this.infrastructure.roles;

    this.apiRequest.getTherapist().subscribe(res => {
      this.therapists = res;
    });
  }

}
