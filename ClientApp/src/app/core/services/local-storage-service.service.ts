import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {

  getUser(): any {
    return sessionStorage.getItem(`oidc.user:${environment.url}:TherapeuticStudio`);
  }

}
