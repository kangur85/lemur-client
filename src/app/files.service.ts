import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { FileEntry } from "./FileEntry";

@Injectable()
export class FilesService {


  stomp: any;
  sockJS: any;

  constructor() { 
    console.log("files.service constructor");
    if (this.sockJS == null) {
      this.sockJS = SockJS('http://localhost:8080/lemur');
      this.stomp = Stomp.over(this.sockJS);
      this.stomp.connect({}, 
        (frame) => {
          console.log('Connected: ' + frame);
          this.stomp.subscribe('/user/queue/allFiles',
          (message) => {
             var json = JSON.parse(message.body);
             console.log("json: " + json);
          });
          this.stomp.send("/app/lemur", {}, "dummy");
        },
        (error) => {console.log("error: " + error);});
    }
  }

  public subscribe(): void {
    
  };

}
