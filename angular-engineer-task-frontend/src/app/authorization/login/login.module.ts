import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { SharedModule } from '@app/shared';
import { LoginRoutingRoutingModule } from './login-routing-routing.module';

@NgModule({
  imports: [LoginRoutingRoutingModule, SharedModule],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class LoginModule {}
