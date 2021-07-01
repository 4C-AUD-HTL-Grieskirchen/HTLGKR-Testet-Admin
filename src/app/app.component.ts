import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {BarcodeScannerLivestreamComponent} from 'ngx-barcode-scanner';
import {AngularFirestore} from '@angular/fire/firestore';
import {ConfirmationService} from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'BarcodeScannerAngular';
  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner: BarcodeScannerLivestreamComponent;
  qrResultString: string;
  registrations: Registration[];


  ngAfterViewInit(): void {
  }


  onStarted(started): void {
    console.log(started);
  }

  constructor(private afs: AngularFirestore, private confirmationService: ConfirmationService) {
   /* afs.firestore.collection('Registrations').get()
      .then((querySnapshot) => querySnapshot.forEach(doc => doc.ref.update({
        result: 'unknown',
      })));*/
    afs.collection<Registration>('Registrations', ref => ref.where('codeScanned', '==', true)
      .where('result', '==', 'unknown')
    )
      .valueChanges({idField: 'id'})
      .subscribe(data => {
        this.registrations = data;
      });

  }


  onCodeResult(resultString: string): void {

    this.qrResultString = resultString;
    this.sendCode(resultString);
  }

  setResult(result: string, registration: any): void {
    this.confirmationService.confirm({
      message: `Sind Sie sicher dass Sie ${result.toUpperCase()} eintragen wollen?`,
      accept: () => {
        registration.result = result;
        this.afs.doc<Registration>(`Registrations/${registration.id}`).ref.update({result});
        this.confirmationService.close();
      },
      reject: () => {
        this.confirmationService.close();
        return;
      }
    });
  }

  openStatusDialog(): void {
    this.confirmationService.confirm({
      message: 'Welches Ergebnis hatte der Test?',
    });
  }

  sendCode(code: string): void {
    const registration = this.afs.doc<Registration>(`Registrations/${code}`);
    registration.update({codeScanned: true}).then(response => console.log(response));
  }
}


class Registration {
  firstname: string;
  lastname: string;
  codeScanned: boolean;
  positive = 'invalid';
}
