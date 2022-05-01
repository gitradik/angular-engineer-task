import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@app/shared';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WebsocketService } from '@app/core/services/websocket.service';
import { NotesService } from '@app/core/services/notes.service';
import { NotesComponent } from './notes.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NotesActionsComponent } from './notes-actions/notes-actions.component';
import { NotesTagsComponent } from './notes-tags/notes-tags.component';
import { NoteWorkspaceTitleComponent } from './note-workspace/note-workspace-title/note-workspace-title.component';
import { NoteWorkspaceContentComponent } from './note-workspace/note-workspace-content/note-workspace-content.component';
import { TagsService } from '@app/core/services/tags.service';

@NgModule({
  imports: [
    SharedModule,
    MatGridListModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [NotesComponent],
  declarations: [
    NotesComponent,
    NotesListComponent,
    NotesActionsComponent,
    NotesTagsComponent,
    NoteWorkspaceTitleComponent,
    NoteWorkspaceContentComponent,
  ],
  providers: [NotesService, TagsService, WebsocketService],
})
export class NotesModule {}
