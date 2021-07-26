import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { TherapistModule } from './therapist/therapist.module';
import { RouterModule } from '@angular/router';
import { TherapistsManageComponent } from './therapists-manage/therapists-manage.component';
import { ProcedureModule } from './procedure/procedure.module';
import { ClientModule } from './client/client.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';

@NgModule({
  declarations: [HomeComponent, TherapistsManageComponent],
  imports: [
    CommonModule,
    TherapistModule,
    ProcedureModule,
    ClientModule,
    RouterModule.forChild([
      { path: 'therapist', loadChildren: () => import('./therapist/therapist.module').then(m => m.TherapistModule) },
      { path: 'procedure', loadChildren: () => import('./procedure/procedure.module').then(m => m.ProcedureModule) },
      { path: 'client', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) },
      { path: 'cash-desk', loadChildren: () => import('./cash-desk/cash-desk.module').then(m => m.CashDeskModule), canActivate: [AuthorizeGuard] },
      { path: 'therapists-manage', component: TherapistsManageComponent , canActivate: [AuthorizeGuard] },
    ]),
  ]
})
export class FeaturesModule { }
