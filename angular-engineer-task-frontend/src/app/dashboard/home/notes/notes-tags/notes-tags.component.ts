import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Tag } from '@app/core/services/tags.service';

@Component({
  selector: 'app-notes-tags',
  templateUrl: './notes-tags.component.html',
  styleUrls: ['./notes-tags.component.scss']
})
export class NotesTagsComponent {
  @Input() data!: Observable<Tag[]>;
  @Input() selected!: Observable<Tag | null>;

  @Output() selection = new EventEmitter<string>();

  handleClickTag(id: string): void {
    this.selection.emit(id);
  }
}
