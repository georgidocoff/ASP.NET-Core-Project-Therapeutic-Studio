import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ApiRequest } from 'src/app/core/api/api-therapeutick-studio';
import { MessagesService } from 'src/app/core/services/messages.service';
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

  isPaymentDataAvailable: boolean = false;
  isNoDataAvailable: boolean = false;
  isLoading: boolean = false;
  alerts: IAlertModel[] = [];

  constructor(
    private paymentsService: PaymentsService,
    private proceduresService: ProceduresService,
    private messages: MessagesService,
  ) { }

  ngOnInit() {
    this.setBsConfig();

    setTimeout(() => {
      this.isLoading = true;
    }, 500);
  }

  private toggle() {
    this.isNoDataAvailable = false;
    this.isPaymentDataAvailable = false;
    this.isLoading = false;
    this.unpaid = 0;
    this.paid = 0;

    this.paymentsService.getPaymentsByDate(this.selectedDay.toUTCString())
      .subscribe(data => {
        this.payments = data;

        this.payments.forEach(paiment => {
          if (paiment.type == 0) {
            this.unpaid += paiment.price;
          } else {
            this.paid += paiment.price;
          }
        });

        if (this.payments
          ? this.payments.length > 0
          : false) {
          this.isPaymentDataAvailable = true;
        } else if (this.payments
          ? this.payments.length == 0
          : false) {
          this.isNoDataAvailable = true;
        }

        setTimeout(() => {
          this.isLoading = true;
        }, 300);
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

  private message(type: string, output: string): void {
    this.alerts.push(this.messages
      .get(type, output));
  }
}
