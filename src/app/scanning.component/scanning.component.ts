import { Component, AfterViewInit  } from '@angular/core';
import * as ScanditSDK from 'scandit-sdk';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BarcodePicker } from 'scandit-sdk';
import { $ } from 'protractor';

@Component({
  selector: 'app-scan',
  templateUrl: './scanning.component.html',
  styleUrls: ['./scanning.component.css']
})

export class ScanningComponent implements AfterViewInit  {

  public scanning = false;
  public inputValue: string;

  private scannerContainer: HTMLElement;
  private scanInput: HTMLElement;
  private barcodePicker: ScanditSDK.BarcodePicker;

  constructor(private deviceService: DeviceDetectorService) {}

  public isDeviceWithCamera(): Boolean {
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    if (isMobile || isTablet ) {
      return true;
    } else if (isDesktopDevice) {
      return false;
    }
  }

  public ngAfterViewInit(): void {
      this.scannerContainer = document.getElementById('scandit-barcode-picker');
      this.scanInput = document.getElementById('scan-input');
      this.initializeScanner();
  }

  public scan(): void {
    this.startScanning();
  }

  public cancelScanning(): void {
    this.stopScanning();
  }

  private startScanning(): void {
    this.scanning = true;
    if (this.barcodePicker) {
     this.barcodePicker.resumeScanning().then(function() {
       document.getElementById('scandit-barcode-picker').style.opacity = '1';
     });
    }
  }

  private stopScanning(): void {
    this.scanning = false;
    if (this.barcodePicker) {
       this.barcodePicker.pauseScanning();
       document.getElementById('scandit-barcode-picker').style.opacity = '0';
    }
  }

  private initializeScanner(): void {
    const licenseKey = '<<----------Licentie---------->>';

    ScanditSDK.configure(licenseKey, { engineLocation: 'assets/' });

    ScanditSDK.BarcodePicker.create(this.scannerContainer)
      .then(barcodePicker => {
        this.barcodePicker = barcodePicker;

        const scanSettings = new ScanditSDK.ScanSettings({
          enabledSymbologies: [
            ScanditSDK.Barcode.Symbology.CODE128,
            ScanditSDK.Barcode.Symbology.CODE39,
            ScanditSDK.Barcode.Symbology.QR,
            ScanditSDK.Barcode.Symbology.INTERLEAVED_2_OF_5
          ]
        });
        this.barcodePicker.applyScanSettings(scanSettings);
        this.barcodePicker.setVibrateOnScanEnabled(true);
        this.barcodePicker.setTapToFocusEnabled(true);
        this.barcodePicker.setTorchEnabled(false);
        this.barcodePicker.setTorchToggleEnabled(false);
        this.barcodePicker.setMirrorImageEnabled(false);
        this.barcodePicker.setTargetScanningFPS(25);
        this.barcodePicker.setGuiStyle(BarcodePicker.GuiStyle.VIEWFINDER);
        this.barcodePicker.onScan(this.handleScan.bind(this));
        this.barcodePicker.onScanError(error => alert(error.message));
        this.barcodePicker.resumeScanning();
      })
      .catch(error => alert(error));
  }

  private handleScan(scanResult: ScanditSDK.ScanResult): void {
    this.stopScanning();
    this.inputValue = scanResult.barcodes[0].data;
  }
}
