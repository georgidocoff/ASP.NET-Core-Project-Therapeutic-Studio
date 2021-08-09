import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

@NgModule({
  declarations: [ProgressBarComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  exports:[ProgressBarComponent],
})

export class SharedModule { }
