import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LocalStorageServiceService } from '../../core/services/local-storage-service.service';
import { ApiRequest } from '../../core/api/api-therapeutick-studio';
import { AppConstants } from '../../shared/app-constan';
import { ProcedureModel } from 'src/app/shared/Models/ProcedureModel';

import { TypeaheadConfig } from 'ngx-bootstrap/typeahead';
import { BsDropdownConfig, BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { SchedulerModel } from 'src/app/shared/Models/SchedulerModel';
import { TherapistModel } from 'src/app/shared/Models/TherapistModel';
import { ProceduresService } from 'src/app/core/services/procedures.service';
import { TherapistsService } from 'src/app/core/services/therapists.service';
import { ClientsService } from 'src/app/core/services/clients.service';
import { PaymentsService } from 'src/app/core/services/payments.service';
import { PaymentModel } from 'src/app/shared/Models/PaymentModel';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { MessagesService } from 'src/app/core/services/messages.service';
import { AlertModel } from 'src/app/shared/Models/AlertModel';

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
    AlertConfig,
    ProceduresService,
    TherapistsService,
    ClientsService,
    PaymentsService,
    MessagesService,
  ]
})

export class HomeComponent {
  form: FormGroup;

  user: any;
  isAuthenticated: boolean = false;
  isLoading: boolean = false;
  alerts: IAlertModel[] = [];

  paymentMethodAccess: boolean = false;
  paymentType: number = 0;
  isUnpaid: boolean = false;
  isCashDeskPaid: boolean = false;
  isBankPaid: boolean = false;
  payment: IPaymentModel;

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

  isSubmitted: boolean = false;

  constructor(
    private storage: LocalStorageServiceService,
    private apiRequest: ApiRequest,
    private proceduresService: ProceduresService,
    private therapistsService: TherapistsService,
    private clientsService: ClientsService,
    private paymentsService: PaymentsService,
    private messages: MessagesService,
    private constants: AppConstants,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      clientFullName: [null, Validators.required],
      currProcedure: [null, Validators.required],
      therapistFullName: [null],
      reservedHour: [null],
      paymentType: [null],
    });

    this.isAuthenticated = false;
    this.currentDate = this.createCurrentDate(this.searchDate).toLocaleDateString();

    this.user = JSON.parse(this.storage.getUser());
    this.isAuthenticated = this.user != null;

    if (this.isAuthenticated) {
      this.therapistsService.getTherapists()
        .subscribe(data => {
          this.therapists = data;

          setTimeout(() => {
            this.isLoading = true;
          }, 300);
        });

      this.createWorkHours();

      this.proceduresService.getProcedures()
        .subscribe(data => {
          this.procedures = data;
          this.procedures.unshift({ name: 'Select Procedure:' } as ProcedureModel);
        });

      this.clientsService.getClients()
        .subscribe(data => {
          this.clients = data;
        });

      this.getScheduler(this.searchDate, 0);
    } else {
      setTimeout(() => {
        this.isLoading = true;
      }, 500);
    }


  }

  // onClosed(dismissedAlert: AlertConfig): void {
  //   this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  // }
  private changeDate(modifier: number): void {
    this.isLoading = false;

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
    this.isLoading = false;
    this.isCurrentDayToday = true;
    this.searchDate = new Date;
    this.currentDate = this.createCurrentDate(this.searchDate).toLocaleDateString();

    this.createWorkHours();
  }

  private searchClients(): string[] {
    return this.clientsService.importClientFullname(this.clients);
  }

  private cancel(): void {
    this.form.reset();
    this.show = !this.show;
  }

  private save(therapistFullName, reservedHour): void {
    this.isSubmitted = true;

    const currentProcedure = !this.procedure
      ? this.procedures.find(x => x.name == this.form.value.currProcedure)
      : this.procedure;

    const currentClient = this.clientsService.getClientId(
      !this.form.value.clientFullName
        ? this.clientFullName
        : this.form.value.clientFullName
      , this.clients);

    if (this.form.valid) {
      this.show = !this.show;

      let currentScheduler = new SchedulerModel;
      currentScheduler.timeStamp = reservedHour;
      currentScheduler.procedureId = currentProcedure.id;
      currentScheduler.clientId = currentClient;
      currentScheduler.therapistId = this.therapistsService.getTherapistId(therapistFullName, this.therapists);
      currentScheduler.paymentType = this.form.value.paymentType ? this.form.value.paymentType : 0;

      if (!this.paymentMethodAccess) {
        this.apiRequest.createScheduler(currentScheduler)
          .subscribe(data => {
            this.getScheduler(this.searchDate, 0);

            this.message('create', ` new scheduler.`)
            this.createWorkHours();
          });

      } else {
        this.payment = new PaymentModel;
        this.payment.clientId = currentScheduler.clientId;
        this.payment.createAt = new Date;
        this.payment.type = currentScheduler.paymentType;
        this.payment.price = this.procedure.price;

        this.paymentsService.createPayment(this.payment, this.scheduler.id)
          .subscribe(data => {

            data ? currentScheduler.paymentId = data.id : null;

            this.apiRequest.updateScheduler(this.scheduler.id, currentScheduler)
              .subscribe(data => {
                this.message('update', ` scheduler`)

                this.getScheduler(this.searchDate, 0);

                this.createWorkHours();
              });
          })
      }

      this.form.reset();
    }
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

  private getClientId(clientFullName: string): string {
    return this.clientsService.getClientId(clientFullName, this.clients);
  }

  private selectTherapist(therapist, workHour, event): void {
    this.isSubmitted = false;
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
      this.procedure = this.proceduresService.getProcedureName(dtData[1], this.procedures);
      this.clientFullName = dtData[0];
      this.form.value.clientFullName = this.clientFullName;
      this.form.value.currProcedure = this.procedure.name;
      this.form.value.therapistFullName = this.therapistFullName;
      this.form.value.reservedHour = this.reservedHour;
      const clientId = this.clientsService.getClientId(this.clientFullName, this.clients);

      this.scheduler = this.schedulers
        .find(x =>
          (x.clientId == clientId)
          && (x.timeStamp == this.reservedHour)
          && (x.therapistId == this.therapistsService.getTherapistId(this.therapistFullName, this.therapists)));

      switch (this.scheduler ? this.scheduler.paymentType : this.paymentType) {
        case 0:
          this.isUnpaid = true;
          this.isCashDeskPaid = false;
          this.isBankPaid = false;
          this.paymentType = 0;
          break;
        case 1:
          this.isUnpaid = false;
          this.isCashDeskPaid = true;
          this.isBankPaid = false;
          this.paymentType = 1;
          break;
        case 2:
          this.isUnpaid = false;
          this.isCashDeskPaid = false;
          this.isBankPaid = true;
          this.paymentType = 2;
          break;
        default:
          throw Error('The payment type is invalid.')
      }
    }
  }

  private changeProcedure(): void {
    this.procedure = this.proceduresService
      .getProcedureName(this.form.value.currProcedure, this.procedures);
  }

  private getScheduler(date, hour): void {
    this.apiRequest.getSchedulers(date.toUTCString(), hour)
      .subscribe(data => {

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

      if (i == this.constants.workHourLastHour - 1
        && this.therapists) {

        setTimeout(() => {
          this.isLoading = true;
        }, 300);
      }
    }
  }

  private createTableDate(current = new Date, index) {
    return new Date(current.getUTCFullYear(),
      current.getUTCMonth(),
      current.getUTCDate(),
      (index), 0, 0.000).toUTCString();
  }

  private message(type: string, output: string): void {
    this.alerts.push(this.messages
      .get(type, output));
  }

  private isNotValid(controlName: string): boolean {
    return (this.form.controls[controlName].invalid && this.isSubmitted) || (this.form.controls[controlName].dirty && this.form.controls[controlName].invalid);
  }
}
