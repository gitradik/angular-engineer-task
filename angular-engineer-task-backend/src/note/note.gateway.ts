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

  @SubscribeMessage(event)
  onMessage(@MessageBody() data: Message): Observable<WsResponse<NoteDto>> {
    if (data.id && typeof data.id === 'string') {
      const note = notesArr.find(n => n.id === data.id);

      if (note) {
        note[data.field] = data.value;
        note.updatedAt = new Date();

        if (data.field === 'content') {
          
        }

        return of({ event, data: note });
      }
    }

    throw new WsException('Bad Request');
  }
}
