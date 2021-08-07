import { Component, OnInit } from '@angular/core';

import { Infrastructure } from '../../../shared/infrastructure';
import { ApiRequest } from '../../../core/api/api-therapeutick-studio';
import { TherapistsService } from 'src/app/core/services/therapists.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
  providers: [Infrastructure, ApiRequest,TherapistsService]
})
export class ManageComponent implements OnInit {
  therapists: ITherapistModel[];
  positions: any;
  roles: any;

  constructor(
    private infrastructure: Infrastructure,
    private therapistsService: TherapistsService,
  ) { }

  ngOnInit() {
    this.positions = this.infrastructure.positions;

    this.roles = this.infrastructure.roles;

    this.therapistsService.getTherapists().subscribe(res => {
      this.therapists = res;
    });
  }

}
