import { Component, OnInit } from '@angular/core';

import { Infrastructure } from '../../../shared/infrastructure';
import { ApiRequest } from '../../../core/api/api-therapeutick-studio';
import { TherapistsService } from 'src/app/core/services/therapists.service';
import { MessagesService } from 'src/app/core/services/messages.service';
import { AlertConfig } from 'ngx-bootstrap/alert';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
  providers: [Infrastructure, ApiRequest, TherapistsService, AlertConfig]
})
export class ManageComponent implements OnInit {
  therapists: ITherapistModel[];
  therapist: ITherapistModel;

  isDeleteDialog: boolean = false;
  index: number;

  isManageDialog: boolean = false;
  isLoading: boolean = false;
  alerts: IAlertModel[] = [];

  positions: any[];
  position: any;
  selectPosition: any;
  roles: any[];
  role: any;
  selectRole: any;

  constructor(
    private infrastructure: Infrastructure,
    private therapistsService: TherapistsService,
    private messages: MessagesService,
  ) { }

  ngOnInit() {
    this.positions = this.infrastructure.positions;

    this.roles = this.infrastructure.roles;

    this.getTherapists();
  }

  public editTherapist(therapist: ITherapistModel): void {
    this.isLoading = false;

    this.isManageDialog = !this.isManageDialog;
    this.therapist = { ...therapist };

    this.selectPosition = this.infrastructure.positions[therapist.positionType].viewValue;

    this.selectRole = this.infrastructure.roles[therapist.roleType].viewValue;

    setTimeout(() => {
      this.isLoading = true;
    }, 300);
  }

  private cancel() {
    this.isLoading = false;

    this.isManageDialog = !this.isManageDialog;

    this.getTherapists();
  }

  private save(therapist: ITherapistModel) {
    this.isLoading = false;

    this.therapistsService.updateTherapist(therapist.id, therapist)
      .subscribe(data => {
        this.isManageDialog = !this.isManageDialog;

        this.message('update', therapist);

        this.getTherapists();
      });
  }

  private changePosition() {
    this.therapist.positionType = this.positions.find(x => x.viewValue == this.selectPosition).value;
  }

  private changeRole() {
    this.therapist.roleType = this.roles.find(x => x.viewValue == this.selectRole).value;
  }

  public deleteTherapist(therapist: ITherapistModel, index: number): void {
    this.isDeleteDialog = true;
    if (!therapist) {
      throw Error('The therapist value is incorect')
    }

    this.message('warning', therapist);
    this.therapist = therapist;
    this.index = index;
  }

  private decline(): void {
    this.isDeleteDialog = !this.isDeleteDialog;
  }

  private confirm(): void {
    if (!this.therapist || !this.index) {
      throw Error('The value of client is invalid.')
    }

    this.therapistsService.deleteTherapist(this.therapist.id);

    this.therapists.splice(this.index, 1);
  
    this.message('delete', this.therapist);

    setTimeout(() => {
      
      this.getTherapists();
    }, 300);
    this.isDeleteDialog = !this.isDeleteDialog;
  }

  private getTherapists(): void {
    this.therapistsService.getTherapists().subscribe(res => {
      this.therapists = res;

      setTimeout(() => {
        this.isLoading = true;
      }, 300);
    });
  }

  private message(type: string, therapist: ITherapistModel): void {
    this.alerts.push(this.messages
      .get(type, `${therapist.firstName} ${therapist.lastName}`));
  }
}
