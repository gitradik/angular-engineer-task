import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-notes-actions',
  templateUrl: './notes-actions.component.html',
  styleUrls: ['./notes-actions.component.scss'],
})
export class NotesActionsComponent implements OnInit, OnDestroy {
  readonly controlName = 'filterString';
  destroy$ = new Subject<boolean>();
  form!: FormGroup;

  @Output() changeFilter = new EventEmitter<string>();
  @Output() create = new EventEmitter<void>();

  constructor() {
    this.form = new FormGroup({
      [this.controlName]: new FormControl(''),
    });
  }

  getFilterStringControl(): AbstractControl {
    return this.form.get(this.controlName)!;
  }

  resetFilterString() {
    this.getFilterStringControl().setValue('');
  }

  ngOnInit(): void {
    this.getFilterStringControl()
      .valueChanges.pipe(takeUntil(this.destroy$))
      .pipe(debounceTime(300))
      .subscribe((value: string) => {
        this.changeFilter.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
