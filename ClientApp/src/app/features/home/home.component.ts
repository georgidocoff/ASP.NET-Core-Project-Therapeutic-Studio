import { Component } from '@angular/core';
import { LocalStorageServiceService } from '../../core/services/local-storage-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  user: any;
  isAuthenticated: boolean;
  currentDate: any;

  constructor(private storage: LocalStorageServiceService) { }

  ngOnInit() {
    this.isAuthenticated = false;
    this.currentDate = this.createCurrentDate(new Date()).toLocaleDateString();
console.log(this.currentDate);

    this.user = JSON.parse(this.storage.getUser());
    this.isAuthenticated = this.user != null;

  }

  private createCurrentDate(date): Date {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  }
}
