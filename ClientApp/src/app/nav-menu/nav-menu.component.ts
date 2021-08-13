import { AfterContentInit, Component, OnInit } from '@angular/core';
import { LocalStorageServiceService } from '../core/services/local-storage-service.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements AfterContentInit {
  isExpanded: boolean = false;
  isAuthenticated: boolean = true;
  isAdmin: boolean = false;

  constructor(
    private storage: LocalStorageServiceService,
  ) { }

  ngAfterContentInit() {
    this.isAdmin = this.storage.isUserAdmin();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }


}
