import { Component, ElementRef, Injectable, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { LocalStorageServiceService } from '../../core/services/local-storage-service.service';
import { ApiRequest } from '../../core/api/api-therapeutick-studio';
import { AppConstants } from '../../shared/app-constan';
import { ProcedureModel } from 'src/app/shared/Models/ProcedureModel';

import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { TypeaheadConfig } from 'ngx-bootstrap/typeahead';
import { BsDropdownConfig, BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { SchedulerModel } from 'src/app/shared/Models/SchedulerModel';
import { TherapistModel } from 'src/app/shared/Models/TherapistModel';
import { ClientModel } from 'src/app/shared/Models/ClientModel';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    ApiRequest,
    AppConstants,
    TypeaheadConfig,
    BsDropdownConfig,
    BsDropdownDirective,
  ]
})

export class HomeComponent {
  form: FormGroup;

  user: any;
  isAuthenticated: boolean;

  paymentMethodAccess: boolean = false;
  paymentType: number = 0;
  isUnpaid: boolean = false;
  isCashDeskPaid: boolean = false;
  isBankPaid: boolean = false;

  show: boolean = true;
  showDialogDropdown: boolean = true;

  isCurrentDayToday: boolean = true;
  currentDate: any;
  searchDate = new Date;
  workHours: any[];
  reservedHour: any;

  therapist: ITherapistModel;
  therapists: ITherapistModel[];
  therapistFullName: string;

  procedures: IProcedureModel[];
  procedure: IProcedureModel;

  clients: IClientModel[];
  client: IClientModel;
  clientToView: string;
  clientFullName: string;

  schedulers: ISchedulerModel[];
  scheduler: ISchedulerModel;

  constructor(
    private storage: LocalStorageServiceService,
    private apiRequest: ApiRequest,
    private constants: AppConstants,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {

    this.form = this.fb.group({
      clientFullName: [null],
      currProcedure: [null],
      therapistFullName: [null],
      reservedHour: [null],
      paymentType: [null],
    });

    this.isAuthenticated = false;
    this.currentDate = this.createCurrentDate(this.searchDate).toLocaleDateString();

    this.user = JSON.parse(this.storage.getUser());
    this.isAuthenticated = this.user != null;

    this.apiRequest.getTherapist()
      .subscribe(data => {
        this.therapists = data;
        //console.log(this.therapists);

      });

    this.createWorkHours();

    this.apiRequest.getProcedures()
      .subscribe(data => {
        this.procedures = data;
        this.procedures.unshift({ name: 'Select Procedure:' } as ProcedureModel);
      });

    this.apiRequest.getClients()
      .subscribe(data => {
        this.clients = data;
      });

    this.getScheduler(this.searchDate, 0);
  }

  private changeDate(modifier: number): void {
    this.searchDate.setDate(this.searchDate.getDate() + modifier);
    this.currentDate = this.createCurrentDate(this.searchDate).toLocaleDateString();

    if (this.searchDate.getDate() == new Date().getDate()) {
      this.isCurrentDayToday = true;
    } else {
      this.isCurrentDayToday = false;
    }


    this.createWorkHours();
  }

  private currentDay(): void {
    this.isCurrentDayToday = true;
    this.searchDate = new Date;
    this.currentDate = this.createCurrentDate(this.searchDate).toLocaleDateString();

    this.createWorkHours();
  }

  private searchClients(): string[] {
    let clientsExtend: string[] = [];
    // let query = event.query;
    for (let i = 0; i < this.clients.length; i++) {
      let client = this.clients[i];

      //TODO find better way to remove clinet middleName null value

      if (client.middleName != null) {
        client.fullName = client.firstName + ' ' + client.middleName + ' ' + client.lastName;
      } else {
        client.fullName = client.firstName + ' ' + client.lastName;
      }
      clientsExtend.push(client.fullName);
    }

    return clientsExtend;
  }

  private cancel(): void {
    this.form.reset();
    this.show = !this.show;
  }

  private save(therapistFullName, reservedHour): void {
    this.show = !this.show;
    let currentScheduler = new SchedulerModel;
    currentScheduler.timeStamp = reservedHour;
    currentScheduler.procedureId = !this.procedure
      ? this.procedures.find(x => x.name == this.form.value.currProcedure).id
      : this.procedure.id;
    currentScheduler.clientId = this.getClientId(
      !this.form.value.clientFullName
        ? this.clientFullName
        : this.form.value.clientFullName);
    currentScheduler.therapistId = this.getTherapistId(therapistFullName);
    currentScheduler.paymentType = this.form.value.paymentType;

    // console.log(this.form.value.paymentType);
    // console.log(this.scheduler);

    if (!this.paymentMethodAccess) {
      this.apiRequest.createScheduler(currentScheduler)
        .subscribe(data => {
          this.getScheduler(this.searchDate, 0);

          this.createWorkHours();
        });

    } else {
      this.apiRequest.updateScheduler(this.scheduler.id, currentScheduler)
        .subscribe(data => {

          this.getScheduler(this.searchDate, 0);

          this.createWorkHours();
        });
    }


    this.form.reset();
  }

  public isDataAvaible(column, rowData, index): boolean {
    let dataToView = false;

    if ((this.schedulers
      ? this.schedulers.length > 0
      : false) &&
      (this.clients
        ? this.clients.length > 0
        : false) &&
      (this.procedures
        ? this.procedures.length > 0
        : false)
    ) {

      this.schedulers.forEach(scheduler => {

        if (rowData.currentDate == scheduler.timeStamp &&
          column.id == scheduler.therapistId) {
          let clientIndex = this.clients.findIndex(c => c.id == scheduler.clientId);
          let procedureIndex = this.procedures.findIndex(x => x.id == scheduler.procedureId);

          const secondNamePartToView = this.clients[clientIndex].middleName
            ? this.clients[clientIndex].middleName + ' ' + this.clients[clientIndex].lastName
            : this.clients[clientIndex].lastName;

          this.clientToView = `${this.clients[clientIndex].firstName} ${secondNamePartToView} - ${this.procedures[procedureIndex].name}`;

          dataToView = true;;
        }
      });

    }
    return dataToView;
  }

  private getClientId(clientFullName): string {
    const fullName = clientFullName.split(' ');
    const firstName = fullName[0];
    const lastName = fullName[fullName.length - 1];
    let middleName = null;
    if (fullName.length > 2) {
      middleName = fullName[1];
    }
    const result = this.clients
      .find(x => (x.firstName == firstName
         && x.lastName == lastName
         && x.middleName == middleName));
    return result.id;
  }

  private getTherapistId(therapistFullName): number {
    let addedTherapist = therapistFullName.split(' ');
    let currentTherapist = new TherapistModel as ITherapistModel;
    currentTherapist.firstName = addedTherapist[0];
    currentTherapist.lastName
    let therapistId = this.therapists.find(x =>
    ((x.firstName == addedTherapist[0]) &&
      (x.lastName == addedTherapist[addedTherapist.length - 1]) &&
      (addedTherapist.length > 2 ? x.middleName == addedTherapist[1] : true))).id;

    return therapistId;
  }

  private selectTherapist(therapist, workHour, event): void {
    this.clientFullName = '';
    this.procedure = null;
    this.paymentMethodAccess = false;
    const dtData = event.target.innerText.split(' - ');

    this.show = !this.show;
    this.therapistFullName = therapist.firstName + ' ' + therapist.lastName;
    this.reservedHour = workHour.currentDate;
    this.showDialogDropdown = !this.showDialogDropdown;

    if (dtData.length == 2) {

      this.paymentMethodAccess = true;
      this.procedure = this.getProcedureName(dtData[1]);
      this.clientFullName = dtData[0];
      this.form.value.clientFullName = this.clientFullName;
      this.form.value.currProcedure = this.procedure.name;
      this.form.value.therapistFullName = this.therapistFullName;
      this.form.value.reservedHour = this.reservedHour;
      const clientId = this.getClientId(this.clientFullName);

      this.scheduler = this.schedulers
        .find(x =>
          (x.clientId == clientId)
          && (x.timeStamp == this.reservedHour)
          && (x.therapistId == this.getTherapistId(this.therapistFullName)));

      this.form.value.paymentType = this.scheduler ? this.scheduler.paymentType : this.paymentType;

      switch (this.form.value.paymentType) {
        case 0:
          this.isUnpaid = true;
          this.isCashDeskPaid = false;
          this.isBankPaid = false;
          //console.log(this.form.value.paymentType);

          break;
        case 1:
          this.isUnpaid = false;
          this.isCashDeskPaid = true;
          this.isBankPaid = false;
          //console.log(this.form.value.paymentType);
          break;
        case 2:
          this.isUnpaid = false;
          this.isCashDeskPaid = false;
          this.isBankPaid = true;
          //console.log(this.form.value.paymentType);
          break;
        default:
          this.isUnpaid = true;
          this.isCashDeskPaid = false;
          this.isBankPaid = false;
          //console.log(this.form.value.paymentType);
          break;
      }
      //console.log(this.scheduler);

      //console.log(this.form.value.clientFullName);

    }

  }

  private changeProcedure(): void {
    this.procedure = this.getProcedureName(this.form.value.currProcedure);
  }

  private getProcedureName(name: string): IProcedureModel {
    return this.procedures.find(x => x.name == name);;
  }

  private getScheduler(date, hour): void {
    this.apiRequest.getSchedulers(date.toUTCString(), hour)
      .subscribe(data => {
        //console.log(data);
        this.schedulers = data;
      });
  }

  private createCurrentDate(date): Date {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  }

  private createWorkHours(current: Date = this.searchDate): void {
    this.workHours = [];
    for (let i = this.constants.workHourFirstHour; i < this.constants.workHourLastHour; i++) {
      this.workHours.push({
        index: i,
        startMinute: 0,
        endtMinute: 59,
        currentDate: this.createTableDate(current, i),
        text: []
      });
    }
  }

  private createTableDate(current = new Date, index) {
    // console.log(current);
    return new Date(current.getUTCFullYear(),
      current.getUTCMonth(),
      current.getUTCDate(),
      (index), 0, 0.000).toUTCString();
  }
}
