import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiRequest } from 'src/app/core/api/api-therapeutick-studio';
import { MessagesService } from 'src/app/core/services/messages.service';

import { ProceduresService } from 'src/app/core/services/procedures.service';
import { ProcedureModel } from '../../../shared/Models/ProcedureModel';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ApiRequest, ProceduresService]
})
export class CreateComponent implements OnInit {
  form: FormGroup;

  isLoading: boolean = false;
  alerts: IAlertModel[] = [];

  constructor(
    private fb: FormBuilder,
    private proceduresService: ProceduresService,
    private messages: MessagesService,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null],
      duration: [null],
      price: [null],
    });

    setTimeout(() => {
      this.isLoading = true;
    }, 300);
  }

  onSubmit() {
    this.isLoading = false;

    let currProcedure = new ProcedureModel;
    currProcedure.name = this.form.value.name;
    currProcedure.duration = this.form.value.duration;
    currProcedure.price = this.form.value.price;

    this.proceduresService.createProcedure(currProcedure)
      .subscribe(res => {

        setTimeout(() => {
          this.isLoading = true;
        }, 300);
      });

    this.form.reset();
  }

  private message(type: string, procedure: IProcedureModel): void {
    this.alerts.push(this.messages
      .get(type, `${procedure.name}`));
  }
}
