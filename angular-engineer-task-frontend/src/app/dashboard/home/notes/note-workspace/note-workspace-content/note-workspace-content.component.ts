import { Component, ElementRef, ViewChild } from '@angular/core';
import { NoteWorkspace } from '../note-workspace.component';

@Component({
  selector: 'app-note-workspace-content',
  templateUrl: './note-workspace-content.component.html',
  styleUrls: ['./note-workspace-content.component.scss'],
})
export class NoteWorkspaceContentComponent extends NoteWorkspace {
  @ViewChild('textarea') textarea?: ElementRef;

  isFocused = false;

  constructor() {
    super('content', false);
  }

  getHtmlStr() {
    const str = this.getControl().value;
    if (str === null) return '';
    return str.replace(
      /#(\w+)/g,
      '<span class="mat-chip mat-standard-chip note-workspace-tag">#$1</span>'
    );
  }

  focus() {
    if (!this.disabled) {
      this.isFocused = true;
      setTimeout(() => this.textarea?.nativeElement.focus());
    }
  }
  blur() {
    this.isFocused = false;
  }
}
