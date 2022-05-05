import { Note } from '@app/core/services/notes.service';

export function sortCb(a: Note, b: Note): number {
  return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
}
