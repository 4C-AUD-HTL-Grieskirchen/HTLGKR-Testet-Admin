import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {BarcodeScannerLivestreamComponent} from 'ngx-barcode-scanner';
import {AngularFirestore} from '@angular/fire/firestore';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'BarcodeScannerAngular';
  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner: BarcodeScannerLivestreamComponent;

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

    console.log(this.afs.firestore.doc(`Registrations/${str}`).get().then(doc => console.log(doc.data())));

   
  }
}

