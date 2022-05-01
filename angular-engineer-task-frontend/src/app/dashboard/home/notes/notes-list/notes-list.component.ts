import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { Observable } from 'rxjs';
import { Note } from '@app/core/services/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent {
  @ViewChild('notesList') notesList?: MatSelectionList;

  @Input() data!: Observable<Note[]>;

  @Output() remove = new EventEmitter<string>();
  @Output() selection = new EventEmitter<string>();

  constructor() {}

  removeListItem(event: any, id: string) {
    event.stopPropagation();
    this.remove.emit(id);
  }

  handleSelectionChange({ options }: MatSelectionListChange): void {
    this.selection.emit(options[0].value)
  }
}
