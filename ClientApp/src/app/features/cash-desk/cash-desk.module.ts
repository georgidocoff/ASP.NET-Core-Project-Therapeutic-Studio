import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report/report.component';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,
    BsDatepickerModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'report', component: ReportComponent }
    ]),
  ]
})
export class CashDeskModule { }
