import { Component } from '@angular/core';
import { LocalStorageServiceService } from '../../core/services/local-storage-service.service';
import { ApiRequest } from '../../core/api/api-therapeutick-studio';
import { AppConstants } from '../../shared/app-constan';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [ApiRequest, AppConstants]
})
export class HomeComponent {
  user: any;
  isAuthenticated: boolean;
  show: boolean = true;
  currentDate: any;
  searchDate = new Date;
  workHours: any[];
  reservedHour:any;
  therapist: ITherapistModel;
  therapists: ITherapistModel[];
  therapistFirstName: string;
  therapistLastName: string;

  constructor(
    private storage: LocalStorageServiceService,
    private apiRequest: ApiRequest,
    private constants: AppConstants,
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


  }

  private cancel() {
    this.show = !this.show;
  }

  private save() {
    this.show = !this.show;
  }

  private selectTherapist(therapist, workHour): void {
    console.log(therapist);
    //console.log(workHour);
    this.show = !this.show;
    this.therapistFirstName = therapist.firstName;
    this.therapistLastName = therapist.lastName;
    this.reservedHour=workHour.currentDate;
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
