import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesTagComponent } from './notes-tag.component';

describe('NotesTagComponent', () => {
  let component: NotesTagComponent;
  let fixture: ComponentFixture<NotesTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
