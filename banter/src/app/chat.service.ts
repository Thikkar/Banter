import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { Observable } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket = io.default('http://localhost:3000');

  constructor() { }

  joinRoom(data: any) {
    this.socket.emit('join', data);
  }

  //not necessary for this app
  newUserJoined() {
    let observable = new Observable<{username: String, message: String}>(observer => {
      this.socket.on('new user joined', (data) => {
        observer.next(data)
      })
      return () => {this.socket.disconnect();}
    });

    return observable;
  }

  sendComment(data: any) {
    this.socket.emit('comment', data);
  }

  newCommentReceived() {
    return new Observable<{_id: any, comment: string, username: string, time: string}>(observer => {
      this.socket.on('new comment', (data) => {
        observer.next(data);
      })
      return () => {this.socket.disconnect();}
    });
  }

}
