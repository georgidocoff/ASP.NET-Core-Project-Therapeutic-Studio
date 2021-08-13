import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { ClientsService } from 'src/app/core/services/clients.service';
import { MessagesService } from 'src/app/core/services/messages.service';

import { ApiRequest } from '../../../core/api/api-therapeutick-studio';
import { ClientModel } from '../../../shared/Models/ClientModel';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ApiRequest, ClientsService, AlertConfig]
})
export class CreateComponent implements OnInit {
  form: FormGroup;
  alerts: IAlertModel[] = [];
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private clientsService: ClientsService,
    private messages: MessagesService,
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

        this.message('create', currClient);
      });

    this.form.reset();
  }

  private message(type: string, client: IClientModel): void {
    this.alerts.push(this.messages
      .get(type, `${client.firstName} ${client.lastName}`));
  }
}
