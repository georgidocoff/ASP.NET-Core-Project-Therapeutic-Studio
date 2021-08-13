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
    const getedUser = this.getUser();
    const user = JSON.parse(getedUser);

    //TODO: implements role/claim in profile
    const isAdmin = user ? user.profile.name.includes('admin') : false;
    return isAdmin;
  }
}
