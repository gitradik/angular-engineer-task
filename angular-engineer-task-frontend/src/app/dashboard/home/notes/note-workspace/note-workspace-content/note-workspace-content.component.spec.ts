import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteWorkspaceContentComponent } from './note-workspace-content.component';

describe('NoteWorkspaceContentComponent', () => {
  let component: NoteWorkspaceContentComponent;
  let fixture: ComponentFixture<NoteWorkspaceContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteWorkspaceContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteWorkspaceContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
