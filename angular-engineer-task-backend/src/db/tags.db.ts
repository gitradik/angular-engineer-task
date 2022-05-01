import { v4 as uuidv4 } from 'uuid';
import { TagDto } from 'src/dto/tag.dto';

export const tagsArr: TagDto[] = [
  {
    id: uuidv4(),
    value: '#dolor',
    createdAt: new Date('2022-1-22'),
    updatedAt: new Date('2022-4-24'),
  },
  {
    id: uuidv4(),
    value: '#amet',
    createdAt: new Date('2022-1-22'),
    updatedAt: new Date('2022-4-24'),
  },
];
