import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { TherapistModule } from './therapist/therapist.module';
import { RouterModule, Scroll } from '@angular/router';
import { TherapistsManageComponent } from './therapists-manage/therapists-manage.component';
import { ProcedureModule } from './procedure/procedure.module';
import { ClientModule } from './client/client.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SharedModule } from '../shared/shared.module';
import { AdminGuard } from '../core/guards/Admin.guard';

@NgModule({
  declarations: [HomeComponent, TherapistsManageComponent],
  imports: [
    CommonModule,
    TherapistModule,
    ProcedureModule,
    ClientModule,
    TypeaheadModule,
    BsDropdownModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'therapist', loadChildren: () => import('./therapist/therapist.module').then(m => m.TherapistModule), canActivate: [AdminGuard] },
      { path: 'procedure', loadChildren: () => import('./procedure/procedure.module').then(m => m.ProcedureModule), canActivate: [AdminGuard] },
      { path: 'client', loadChildren: () => import('./client/client.module').then(m => m.ClientModule), canActivate: [AdminGuard] },
      { path: 'cash-desk', loadChildren: () => import('./cash-desk/cash-desk.module').then(m => m.CashDeskModule), canActivate: [AuthorizeGuard, AdminGuard] },
      { path: 'therapists-manage', component: TherapistsManageComponent, canActivate: [AuthorizeGuard] },
    ]),
  ],
  exports: []
})
export class FeaturesModule { }
