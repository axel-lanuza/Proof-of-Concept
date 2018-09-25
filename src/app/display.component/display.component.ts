import { Component, OnInit, Input} from '@angular/core';
import { ImageFile } from '../imagefile';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})

export class DisplayComponent implements OnInit {

  private _file: ImageFile;

  ngOnInit() {
  }

  get file(): ImageFile {
    return this._file;
  }

  @Input()
  set file(file) {
    this._file = file;
  }

  public getFileImage() {
    console.log(this._file.file);
    return this._file.file;
  }
}
