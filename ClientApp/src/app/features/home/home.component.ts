import { Component } from '@angular/core';
import { LocalStorageServiceService } from '../../core/services/local-storage-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  user: any;
  isAuthenticated: boolean;

  constructor(private storage: LocalStorageServiceService) { }

  ngOnInit() {
    this.isAuthenticated= false;

    this.user = JSON.parse(this.storage.getUser());
    this.isAuthenticated = this.user != null;

  }
}
