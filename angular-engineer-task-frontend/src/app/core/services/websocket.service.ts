import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

export interface EventMessage<T> {
  event: string;
  data: T;
}

@Injectable()
export class WebsocketService {
  private socket = new WebSocket(environment.wsUrl);

  getMessages<T>(): Observable<EventMessage<T>> {
    return new Observable((observer) => {
      this.socket.onmessage = function ({ data }) {
        observer.next(JSON.parse(data));
      };
    });
  }

  sendMessage<T>(evtMessage: EventMessage<T>) {
    this.socket.send(
      JSON.stringify({
        event: evtMessage.event,
        data: evtMessage.data,
      })
    );
  }
}
