import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { TherapistModule } from './therapist/therapist.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    TherapistModule,
    RouterModule.forChild([
      { path: 'therapist', loadChildren: () => import('./therapist/therapist.module').then(m => m.TherapistModule) }
    ]),
  ]
})
export class FeaturesModule { }
