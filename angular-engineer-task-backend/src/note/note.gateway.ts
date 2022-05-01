import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { Observable, of } from 'rxjs';

import { notesArr } from 'src/db/notes.db';
import { NoteDto } from 'src/dto/note.dto';
import { TagService } from 'src/tag/tag.service';

export type Message = {
  id: string;
  field: 'title' | 'content';
  value: string;
};

const event = 'notes';

@WebSocketGateway()
export class NotesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private tagService: TagService) {}

  @SubscribeMessage(event)
  async onMessage(@MessageBody() data: Message): Promise<WsResponse<NoteDto>> {
    if (data.id && typeof data.id === 'string') {
      const note = notesArr.find((n) => n.id === data.id);

      if (note) {
        note[data.field] = data.value;
        note.updatedAt = new Date();

        if (data.field === 'content') {
          const tags = await this.tagService.getTagsFromText(data.value);
          await this.tagService.addTags(tags);
        }

        return { event, data: note };
      }
    }

    throw new WsException('Bad Request');
  }
}
