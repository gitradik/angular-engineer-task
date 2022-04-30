import { NgModule } from '@angular/core';

import { AuthorizationComponent } from './authorization.component';
import { SharedModule } from '@app/shared';
import { AuthorizationRoutingModule } from './authorization-routing.module';

@NgModule({
  imports: [AuthorizationRoutingModule, SharedModule],
  declarations: [AuthorizationComponent],
  exports: [AuthorizationComponent],
})
export class AuthorizationModule {}
