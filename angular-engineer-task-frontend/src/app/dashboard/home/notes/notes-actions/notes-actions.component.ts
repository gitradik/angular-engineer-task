import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-notes-actions',
  templateUrl: './notes-actions.component.html',
  styleUrls: ['./notes-actions.component.scss']
})
export class NotesActionsComponent implements OnInit {
  form!: FormGroup;

  @Output() changeSearch = new EventEmitter<string>();

  constructor() {
    this.form = new FormGroup({
      searchValue: new FormControl(null),
    });
  }

  resetSearchValue() {
    this.form.get('searchValue')!.reset();
  }

  ngOnInit(): void {
    this.form.get('searchValue')!.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        this.changeSearch.emit(value);
      });
  }

}
