import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {

  public getUser(): any {
    return sessionStorage.getItem(`oidc.user:${environment.url}:TherapeuticStudio`);
  }

  public isUserAdmin(): boolean {
    //TODO: implements role/claim in profile
    return this.getUser() 
            ? JSON.parse(this.getUser())
                      .profile.name
                      .includes('admin') 
            : false;
  }
}
