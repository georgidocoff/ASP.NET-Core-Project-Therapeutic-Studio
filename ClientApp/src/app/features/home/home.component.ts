import { Component } from '@angular/core';
import { LocalStorageServiceService } from '../../core/services/local-storage-service.service';
import { ApiRequest } from '../../core/api/api-therapeutick-studio';
import { AppConstants } from '../../shared/app-constan';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [ApiRequest, AppConstants]
})
export class HomeComponent {
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
  form: FormGroup;

  constructor(
    private storage: LocalStorageServiceService,
    private apiRequest: ApiRequest,
    private constants: AppConstants,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
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
      .subscribe(data=>{
        this.procedures = data;
      });

      
    // this.form = this.fb.group({
    //   therapistFullName: [null],
    // });
  }

  private cancel() {
    this.show = !this.show;
  }

  private save() {
    this.show = !this.show;
  }

  private onSubmit(){
    console.log('on submit clicked');
    
  }

  private selectTherapist(therapist, workHour): void {
    //console.log(therapist);
    //console.log(workHour);
    this.show = !this.show;
    this.therapistFullName = therapist.firstName + ' '+ therapist.lastName;
    this.reservedHour = workHour.currentDate;
    this.showDialogDropdown=!this.showDialogDropdown;
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
