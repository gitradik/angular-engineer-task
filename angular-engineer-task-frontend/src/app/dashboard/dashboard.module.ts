import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from '@app/dashboard/dashboard-routing.module';
import { DashboardComponent } from '@app/dashboard/dashboard.component';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [
    DashboardRoutingModule,
    SharedModule,
  ],
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
})
export class DashboardModule {}
