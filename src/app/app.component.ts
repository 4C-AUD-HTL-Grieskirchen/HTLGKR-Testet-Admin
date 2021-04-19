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

  // tslint:disable-next-line:typedef
  onValueChanges(result){
    this.barcodeValue = result.codeResult.code;
  }

  // tslint:disable-next-line:typedef
  onStarted(started){
    console.log(started);
  }

  constructor(private afs: AngularFirestore) { }

  // tslint:disable-next-line:typedef
  onSend(str: string) {
    this.afs.firestore.doc('Barcodes/' + str).set({
        key: str,
        text: str
      },
      {
        merge: true
      }).then(() => {
   console.log('Uiiii ich hab grad ' + str + ' auf Firestore geladen :3');
    }).catch(error => {
      console.error(error);
    });
  }
}

