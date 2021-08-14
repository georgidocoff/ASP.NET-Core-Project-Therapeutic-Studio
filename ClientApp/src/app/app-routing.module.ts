import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { HomeComponent } from './features/home/home.component';
import { AccessDeniedComponent } from './shared/access-denied/access-denied.component';
import { ErrorComponent } from './shared/error/error.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'features', loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule), canActivate: [AuthorizeGuard] },
      { path: 'error', component: ErrorComponent },
      { path: 'access', component: AccessDeniedComponent },
      { path: 'notfound', component: NotFoundComponent },
      { path: '**', redirectTo: '/notfound' }
    ], { scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
