import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorComponent } from './error/error.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

@NgModule({
  declarations: [ProgressBarComponent, NotFoundComponent, ErrorComponent, AccessDeniedComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  exports:[ProgressBarComponent,AlertModule],
})

export class SharedModule { }
