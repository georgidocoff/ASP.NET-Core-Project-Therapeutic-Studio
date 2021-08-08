import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ApiRequest } from 'src/app/core/api/api-therapeutick-studio';
import { PaymentsService } from 'src/app/core/services/payments.service';
import { ProceduresService } from 'src/app/core/services/procedures.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [BsDatepickerConfig, ApiRequest, PaymentsService, ProceduresService]
})
export class ReportComponent implements OnInit {
  selectedDay: Date = new Date;
  bsConfig: Partial<BsDatepickerConfig>;

  payments: IPaymentModel[];
  payment: IPaymentModel;
  unpaid: number = 0;
  paid: number = 0;

  procedures: IProcedureModel[];
  procedure: IProcedureModel;

  constructor(
    private paymentsService: PaymentsService,
    private proceduresService: ProceduresService,
  ) { }

  ngOnInit() {
    this.setBsConfig();

  }

  private toggle() {
    this.unpaid = 0;
    this.paid = 0;

    this.paymentsService.getPaymentsByDate(this.selectedDay.toUTCString())
      .subscribe(data => {
        this.payments = data;

        this.payments.forEach(paiment => {
          if (paiment.type==0) {
            this.unpaid+=paiment.price;
          } else {
            this.paid+=paiment.price;
          }
        });

      });

  }

  private getProcedures() {
    this.proceduresService.getProcedures()
      .subscribe(data => {
        this.procedures = data;
      });
  }

  private setBsConfig(): void {
    this.bsConfig = Object.assign({});
    this.bsConfig.isAnimated = true;
    this.bsConfig.containerClass = 'theme-blue';
  }
}
