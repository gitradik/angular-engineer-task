import { v4 as uuidv4 } from 'uuid';
import { NoteDto } from 'src/dto/note.dto';

export const notesArr: NoteDto[] = [
  {
    id: uuidv4(),
    title: 'First note',
    content:
      'Lorem ipsum #dolor sit #amet, consectetur adipisicing elit. Unde, earum!',
    createdAt: new Date('2022-1-22'),
    updatedAt: new Date('2022-4-24'),
  },
  {
    id: uuidv4(),
    title: 'Second note',
    content: '',
    createdAt: new Date('2019-6-23'),
    updatedAt: new Date('2019-7-15'),
  },
  {
    id: uuidv4(),
    title: 'Lart note',
    content: 'Lorem ipsum #dolor, consectetur adipisicing elit. Unde, earum!',
    createdAt: new Date('2019-6-23'),
    updatedAt: new Date('2020-6-23'),
  },
  {
    id: uuidv4(),
    title: 'Mart note',
    content: 'Lorem ipsum #dolor, consectetur adipisicing elit. Unde, earum!',
    createdAt: new Date('2019-6-23'),
    updatedAt: new Date('2019-6-23'),
  },
  {
    id: uuidv4(),
    title: 'Chart note',
    content: '',
    createdAt: new Date('2019-8-2'),
    updatedAt: new Date('2019-8-3'),
  },
  {
    id: uuidv4(),
    title: 'Bah note',
    content: '',
    createdAt: new Date('2019-6-23'),
    updatedAt: new Date('2019-6-23'),
  },
  {
    id: uuidv4(),
    title: 'Warts note',
    content: '',
    createdAt: new Date('2019-6-23'),
    updatedAt: new Date('2019-6-23'),
  },
  {
    id: uuidv4(),
    title: 'Qawrs note',
    content: '',
    createdAt: new Date('2019-6-23'),
    updatedAt: new Date('2019-6-23'),
  },
  {
    id: uuidv4(),
    title: 'Shars note',
    content: '',
    createdAt: new Date('2019-6-23'),
    updatedAt: new Date('2019-6-23'),
  },
  {
    id: uuidv4(),
    title: 'Dabs note',
    content: '',
    createdAt: new Date('2019-6-23'),
    updatedAt: new Date('2019-6-23'),
  },
  {
    id: uuidv4(),
    title: 'Chaps note',
    content: '',
    createdAt: new Date('2019-6-23'),
    updatedAt: new Date('2019-6-23'),
  },
];
