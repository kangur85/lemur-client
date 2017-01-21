import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {Observable} from "rxjs";

@Injectable()
export class FilesService {


  stomp: any;
  sockJS: any;

  constructor() { 
  }

  public subscribe(onNext: (fileEntry: FileEntry) => void) {

    if (this.sockJS == null) {
      this.sockJS = SockJS('http://localhost:8080/lemur');
      this.stomp = Stomp.over(this.sockJS);
      this.stomp.connect({}, 
        (frame) => {
          this.stomp.subscribe('/user/queue/allFiles',
          (message) => {
             var json = JSON.parse(message.body);
             onNext(new FileEntry(json.filePath, json.type));
          });
          this.stomp.send("/app/lemur", {}, "dummy");
        },
        (error) => {console.error("error: " + error);});
    }

  };

}

export class FileEntry {
    filePath: String;
    type: String;
    
    constructor(filePath: String, type: String) {
        this.filePath = filePath;
        this.type = type;
    }
}
