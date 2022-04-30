import { NgModule } from '@angular/core';

import { HomeRoutingModule } from '@app/dashboard/home/home-routing.module';
import { HomeComponent } from '@app/dashboard/home/home.component';
import { SharedModule } from '@app/shared';
import { NotesModule } from './notes/notes.module';

@NgModule({
  imports: [
    HomeRoutingModule,
    NotesModule,
    SharedModule,
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeModule {}
