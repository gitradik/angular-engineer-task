import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DashboardRoutingModule } from '@app/dashboard/dashboard-routing.module';
import { DashboardComponent } from '@app/dashboard/dashboard.component';
import { SharedModule } from '@app/shared';
import { effects, reducers } from '@app/store';
import { NotesService } from '@app/core/services/notes.service';
import { TagsService } from '@app/core/services/tags.service';

@NgModule({
  imports: [
    DashboardRoutingModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
  ],
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
  providers: [NotesService, TagsService],
})
export class DashboardModule {}
