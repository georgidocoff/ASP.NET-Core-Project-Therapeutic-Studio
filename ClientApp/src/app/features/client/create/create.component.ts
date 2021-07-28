import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ApiRequest } from '../../../core/api/api-therapeutick-studio';
import { ClientModel } from '../../../shared/Models/ClientModel';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ApiRequest]
})
export class CreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiRequest: ApiRequest,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: [null],
      middleName: [null],
      lastName: [null],
      ucn: [null],
    });
  }

  onSubmit() {
    let currClient = new ClientModel;
    currClient.firstName = this.form.value.firstName;
    currClient.middleName = this.form.value.middleName;
    currClient.lastName = this.form.value.lastName;
    currClient.ucn = this.form.value.ucn;

    this.apiRequest.createClient(currClient)
      .subscribe(res => {
        //console.log(res);
      });

    this.form.reset();
  }

}
