import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TherapistModel } from 'src/app/shared/Models/TherapistModel';
import { ApiRequest } from '../api/api-therapeutick-studio';

@Injectable({
  providedIn: 'root'
})
export class TherapistsService {
  therapists: ITherapistModel[];

  constructor(
    private apiRequest: ApiRequest,
  ) { }

  public getTherapists(): Observable<ITherapistModel[]> {
    return this.apiRequest.getTherapist();
  }

  public getTherapistId(therapistFullName: string, therapists: ITherapistModel[]): number {
    let addedTherapist = therapistFullName.split(' ');
    let currentTherapist = new TherapistModel as ITherapistModel;
    currentTherapist.firstName = addedTherapist[0];
    currentTherapist.lastName
    let therapistId = therapists.find(x =>
    ((x.firstName == addedTherapist[0]) &&
      (x.lastName == addedTherapist[addedTherapist.length - 1]) &&
      (addedTherapist.length > 2 ? x.middleName == addedTherapist[1] : true))).id;

    return therapistId;
  }

  public createTherapist(currTherapist: ITherapistModel): Observable<ITherapistModel> {
    return this.apiRequest.createTherapist(currTherapist);
  }

  public updateTherapist(id: number, therapist: ITherapistModel) {
    return this.apiRequest.updateTherapist(id,therapist);
  }

  public deleteTherapist(therapistId: number): void {
    this.apiRequest.deleteTherapist(therapistId);
  }
}
