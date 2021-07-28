import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Infrastructure } from '../../../shared/infrastructure';
import { ApiRequest } from '../../../core/api/api-therapeutick-studio';
import { TherapistModel } from '../../../shared/Models/TherapistModel';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [Infrastructure, TherapistModel,ApiRequest]
})

export class CreateComponent implements OnInit {
  form: FormGroup;
  positions: any;
  roles: any;

  constructor(
    private fb: FormBuilder,
    private infrastructure: Infrastructure,
    private apiRequest: ApiRequest,
  ) { }

  ngOnInit() {
    this.positions = this.infrastructure.positions;

    this.roles = this.infrastructure.roles;

    this.form = this.fb.group({
      firstName: [null],
      middleName: [null],
      lastName: [null],
      positionType: [null],
      roleType: [null],
    });
  }

  onSubmit() {
    //console.log(this.form.value);
    let currTherapist = new TherapistModel;
    currTherapist.firstName = this.form.value.firstName;
    currTherapist.middleName = this.form.value.middleName;
    currTherapist.lastName = this.form.value.lastName;
    currTherapist.positionType = +this.form.value.positionType;
    currTherapist.roleType = +this.form.value.roleType;

    this.apiRequest.createTherapist(currTherapist)
      .subscribe(res => {
        //console.log(res);
      });

    this.form.reset();
  }
}
