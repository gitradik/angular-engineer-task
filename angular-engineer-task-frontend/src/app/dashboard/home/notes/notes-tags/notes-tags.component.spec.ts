import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesTagsComponent } from './notes-tags.component';

describe('NotesTagsComponent', () => {
  let component: NotesTagsComponent;
  let fixture: ComponentFixture<NotesTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotesTagsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
