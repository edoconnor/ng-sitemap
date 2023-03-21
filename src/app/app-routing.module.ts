import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeomapComponent } from './geomap/geomap.component';
import { ContinuousComponent } from './continuous/continuous.component';

const routes: Routes = [
  { path: '', redirectTo: 'update', pathMatch: 'full' },
  { path: 'update', component: ContinuousComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
