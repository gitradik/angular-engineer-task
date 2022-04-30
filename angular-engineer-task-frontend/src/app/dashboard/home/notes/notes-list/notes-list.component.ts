import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '@app/core/services/api/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  @Input() data!: Observable<Note[]>;

  constructor() { }

  ngOnInit(): void {
  }

}
