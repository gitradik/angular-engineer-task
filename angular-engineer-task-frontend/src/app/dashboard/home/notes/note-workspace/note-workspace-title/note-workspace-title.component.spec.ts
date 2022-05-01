import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteWorkspaceTitleComponent } from './note-workspace-title.component';

describe('NoteWorkspaceTitleComponent', () => {
  let component: NoteWorkspaceTitleComponent;
  let fixture: ComponentFixture<NoteWorkspaceTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteWorkspaceTitleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteWorkspaceTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
