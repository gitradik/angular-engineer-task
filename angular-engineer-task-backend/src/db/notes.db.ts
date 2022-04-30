import { v4 as uuidv4 } from 'uuid';
import { NoteDto } from 'src/dto/note.dto';

export const notesArr: NoteDto[] = [
  {
    id: uuidv4(),
    title: 'First note',
    content: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    title: 'Second note',
    content: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    title: 'Lart note',
    content: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    title: 'Mart note',
    content: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    title: 'Chart note',
    content: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    title: 'Bah note',
    content: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    title: 'Warts note',
    content: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
