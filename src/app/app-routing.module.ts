import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeomapComponent } from './geomap/geomap.component';
import { ContinuousComponent } from './continuous/continuous.component';

const routes: Routes = [
  { path: '', redirectTo: 'map', pathMatch: 'full' },
  { path: 'map', component: GeomapComponent },
  { path: 'update', component: ContinuousComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
