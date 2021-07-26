import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report/report.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'report', component: ReportComponent }
    ]),
  ]
})
export class CashDeskModule { }
