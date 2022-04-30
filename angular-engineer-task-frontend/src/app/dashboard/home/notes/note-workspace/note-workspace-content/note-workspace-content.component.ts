import { Component } from '@angular/core';
import { NoteWorkspace } from '../note-workspace.component';

@Component({
  selector: 'app-note-workspace-content',
  templateUrl: './note-workspace-content.component.html',
  styleUrls: ['./note-workspace-content.component.scss']
})
export class NoteWorkspaceContentComponent extends NoteWorkspace {
  constructor() {
    super('content', false);
  }
}
