import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BarcodeScannerLivestreamModule} from 'ngx-barcode-scanner';
import {FormsModule} from '@angular/forms';

import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {ZXingScannerModule} from '@zxing/ngx-scanner';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {ConfirmationService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, BarcodeScannerLivestreamModule, FormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ZXingScannerModule,
    TableModule, ButtonModule,
    InputTextModule,
    ConfirmDialogModule,

  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

