import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {BarcodeScannerLivestreamComponent} from 'ngx-barcode-scanner';
import {AngularFirestore} from '@angular/fire/firestore';
import { ZXingScannerModule } from '@zxing/ngx-scanner';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'BarcodeScannerAngular';
  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner: BarcodeScannerLivestreamComponent;
  qrResultString: string;
  barcodeValue;


  ngAfterViewInit(): void {
    this.barcodeScanner.start();
  }

  onValueChanges(result): void{
    this.barcodeValue = result.codeResult.code;
  }

   onStarted(started): void{
    console.log(started);
  }

  constructor(private afs: AngularFirestore) { }

  onSend(str: string): void {
    console.log('sending code');

    const dataFromFirebase = this.afs.firestore.doc(`Registrations/${str}`).get().then(doc => console.log(doc.data()));
    const registration: Registration = JSON.parse(JSON.stringify(dataFromFirebase));

    console.log(registration.firstname);
    console.log(registration.lastname);
  }
  clearResult(): void {
    this.qrResultString = null;
  }
  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }
}


class Registration {
  firstname: string;
  lastname: string;
}
