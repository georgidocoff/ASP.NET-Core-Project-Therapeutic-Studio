import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ApiRequest } from '../../../core/api/api-therapeutick-studio';
import { ProcedureModel } from '../../../shared/Models/ProcedureModel';

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
      name: [null],
      duration: [null],
      price: [null],
    });
  }

  onSubmit() {
    let currProcedure = new ProcedureModel;
    currProcedure.name = this.form.value.name;
    currProcedure.duration = this.form.value.duration;
    currProcedure.price = this.form.value.price;

    this.apiRequest.createProcedure(currProcedure)
      .subscribe(res => {
        //console.log(res);
      });

    this.form.reset();
  }

}
