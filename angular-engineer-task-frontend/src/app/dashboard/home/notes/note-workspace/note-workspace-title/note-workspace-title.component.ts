import { Component } from '@angular/core';
import { NoteWorkspace } from '../note-workspace.component';

@Component({
  selector: 'app-note-workspace-title',
  templateUrl: './note-workspace-title.component.html',
  styleUrls: ['./note-workspace-title.component.scss'],
})
export class NoteWorkspaceTitleComponent extends NoteWorkspace {
  constructor() {
    super('title', true);
  }
}
