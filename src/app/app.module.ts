import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import {WebcamModule} from 'ngx-webcam';
import { DeviceDetectorModule } from 'ngx-device-detector';


import {AppComponent} from './app.component';
import { DetectionComponent } from './devicedetection.component/devicedetection.component';
import { CameraComponent } from './camera.component/camera.component';
import { NavbarComponent } from './navbar.component/navbar.component';
import { ScanningComponent } from './scanning.component/scanning.component';
import { DisplayComponent } from './display.component/display.component';

const appRoutes: Routes = [
  { path: '',        component: CameraComponent },
  { path: 'camera',       component: CameraComponent },
  { path: 'scanning',     component: ScanningComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DetectionComponent,
    CameraComponent,
    NavbarComponent,
    ScanningComponent,
    DisplayComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserModule,
    WebcamModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [
    CameraComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
