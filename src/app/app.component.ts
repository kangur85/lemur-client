import { Component } from '@angular/core';
import { FilesService, FileEntry } from './files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
title = 'app works!';

fileEntries: FileEntry[] = [];

constructor(filesService: FilesService) { 
  filesService.subscribe(
    (fileEntry: FileEntry) => {
      this.fileEntries.push(fileEntry);
    }
  );
}

}

