import { Component, OnInit, Input } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-detection',
  templateUrl: './devicedetection.component.html',
  styleUrls: ['./devicedetection.component.css']
})
export class DetectionComponent implements OnInit {

  deviceInfo = null;
  private _title: string;

  constructor(private deviceService: DeviceDetectorService) {}

  ngOnInit(): void {
      const isMobile = this.deviceService.isMobile();
      const isTablet = this.deviceService.isTablet();
      const isDesktopDevice = this.deviceService.isDesktop();
      if (isMobile || isTablet ) {
        this._title = 'Device is tablet of mobiel';
      } else if (isDesktopDevice) {
        this._title = 'Device is desktop';
      }
    }

  get title(): string {
    return this._title;
  }

  @Input()
  set title(device) {
    this._title = device;
  }
}
