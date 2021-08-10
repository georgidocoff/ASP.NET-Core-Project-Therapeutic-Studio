import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClientsService } from 'src/app/core/services/clients.service';

import { ApiRequest } from '../../../core/api/api-therapeutick-studio';
import { ClientModel } from '../../../shared/Models/ClientModel';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ApiRequest, ClientsService]
})
export class CreateComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private clientsService: ClientsService,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: [null],
      middleName: [null],
      lastName: [null],
      ucn: [null],
    });

    setTimeout(() => {
      this.isLoading = true;
    }, 300);
  }

  onSubmit() {
    this.isLoading = false;

    let currClient = new ClientModel;
    currClient.firstName = this.form.value.firstName;
    currClient.middleName = this.form.value.middleName;
    currClient.lastName = this.form.value.lastName;
    currClient.ucn = this.form.value.ucn;

    this.clientsService.createClient(currClient)
      .subscribe(data => {

        setTimeout(() => {
          this.isLoading = true;
        }, 300);
      });

    this.form.reset();
  }

}
