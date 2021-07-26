import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { ManageComponent } from './manage/manage.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CreateComponent, ManageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'create', component: CreateComponent },
      { path: 'manage', component: ManageComponent },
    ])
  ]
})
export class ProcedureModule { }
