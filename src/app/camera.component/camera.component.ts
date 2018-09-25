import { Component, OnInit} from '@angular/core';
import { ImageFile } from '../imagefile';
import { query } from '@angular/core/src/render3/query';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})

export class CameraComponent implements OnInit {
    selectedFiles = [];
    totalFiles: number;
    value;
    file: ImageFile;

    constructor() {
      this.totalFiles = 0;
    }

    public ngOnInit() {
    }

    onFileChanged(event) {
      this.getFileString(event);
      this.totalFiles++;

    }

    getFileString(event) {
      let istring = '';
      const total = this.totalFiles;
      this.value = '';

      const f = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (function(theFile) {
          return function(e) {
            istring = e.target.result;
          };
        })(f);
        reader.readAsDataURL(f);

      setTimeout(() => {
        this.file = new ImageFile();
        this.file.file = istring;
        this.file.id = total + 1;

      this.addToList();
      }, 1000);
    }

    addToList() {
      this.selectedFiles.push(this.file);
    }

    public holdPressEvent(e) {
      e.preventDefault();
      return false;
    }
}
