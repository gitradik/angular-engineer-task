import { Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { debounceTime, Subject, takeUntil } from "rxjs";

export type WorkspaceChange = {
  value: string;
  field: string;
};

@Component({ template: '' })
export class NoteWorkspace implements OnInit, OnDestroy, OnChanges {
  destroy$ = new Subject<boolean>();
  form!: FormGroup;
  
  @Input() value?: string | null;
  @Input() disabled!: boolean;
  @Output() change = new EventEmitter<WorkspaceChange>();

  constructor(@Inject(String) public controlName: string, @Inject(Boolean) public isRequired: boolean) {
    this.form = new FormGroup({
      [this.controlName]: new FormControl(this.value, isRequired ? Validators.required : null),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const changeValue = changes['value'];
    const disabled = changes['disabled'];
    const control = this.getControl();

    if (changeValue) {
      control.setValue(changeValue.currentValue, { emitEvent: false });
    }
    if (disabled && disabled.currentValue) {
      control.disable()
    } else {
      control.enable();
    }
  }

  getControl(): AbstractControl {
    return this.form.get(this.controlName)!;
  }

  ngOnInit(): void {
    this.getControl().valueChanges
      .pipe(takeUntil(this.destroy$))
      .pipe(debounceTime(300))
      .subscribe(value => {
        this.change.emit({ value, field: this.controlName });
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}