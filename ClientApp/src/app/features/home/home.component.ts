import { Component, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { LocalStorageServiceService } from '../../core/services/local-storage-service.service';
import { ApiRequest } from '../../core/api/api-therapeutick-studio';
import { AppConstants } from '../../shared/app-constan';
import { ProcedureModel } from 'src/app/shared/Models/ProcedureModel';

import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { TypeaheadConfig } from 'ngx-bootstrap/typeahead';
import { BsDropdownConfig, BsDropdownDirective} from 'ngx-bootstrap/dropdown';


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

@Injectable()

export class HomeComponent {
  clientFullName = new FormControl();
  currProcedure = new FormControl();
  form: FormGroup;

  user: any;
  isAuthenticated: boolean;
  paymentMethodAccess: boolean = false;
  show: boolean = true;
  showDialogDropdown: boolean = true;
  currentDate: any;
  searchDate = new Date;
  workHours: any[];
  reservedHour: any;
  therapist: ITherapistModel;
  therapists: ITherapistModel[];
  therapistFullName: string;
  procedures: IProcedureModel[];
  clients: IClientModel[];
  client: IClientModel;

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
    });

    this.isAuthenticated = false;
    this.currentDate = this.createCurrentDate(new Date()).toLocaleDateString();
    //console.log(this.currentDate);

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
        this.procedures.unshift({ name: 'Select Procedure' } as ProcedureModel)
      });

    this.apiRequest.getClients()
      .subscribe(data => {
        this.clients = data;
      });
  }

  searchClients(): string[] {
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

    // this.filteredClient = filtered;
    return clientsExtend;
  }

  private cancel() {
    this.form.reset();
    this.show = !this.show;
  }

  private save(): void {
    this.show = !this.show;
    console.log(this.form.value);

    this.form.reset();
  }

  private onSubmit() {
    console.log('on submit clicked');

  }

  private selectTherapist(therapist, workHour): void {
    //console.log(therapist);
    //console.log(workHour);
    this.show = !this.show;
    this.therapistFullName = therapist.firstName + ' ' + therapist.lastName;
    this.reservedHour = workHour.currentDate;
    this.showDialogDropdown = !this.showDialogDropdown;
  }

  private getProcedureName(name): void {
    console.log(name);

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
