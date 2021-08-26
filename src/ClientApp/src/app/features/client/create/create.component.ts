import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  isSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clientsService: ClientsService,
    private messages: MessagesService,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: [null, Validators.required],
      middleName: [null],
      lastName: [null, Validators.required],
      ucn: [null, Validators.required],
    });

    setTimeout(() => {
      this.isLoading = true;
    }, 300);
  }

  onSubmit() {
    this.isLoading = false;
    this.isSubmitted = true;

    if (this.form.valid) {

      let currClient = new ClientModel;
      currClient.firstName = this.form.value.firstName;
      currClient.middleName = this.form.value.middleName;
      currClient.lastName = this.form.value.lastName;
      currClient.ucn = this.form.value.ucn;

      this.clientsService.createClient(currClient)
        .subscribe({
          next: () => {
            this.isLoading = true;
            this.message('create', currClient);
            setTimeout(() => {

              this.router.navigate(['/']);
               this.form.reset();
            }, 2000);
          },
          error: (err) => {
            console.error(err);
          }
        });     
    }
  }

  private message(type: string, client: IClientModel): void {
    this.alerts.push(this.messages
      .get(type, `${client.firstName} ${client.lastName}`));
  }

  private isNotValid(controlName: string): boolean {
    return (this.form.controls[controlName].invalid && this.isSubmitted) || (this.form.controls[controlName].dirty && this.form.controls[controlName].invalid);
  }
}
