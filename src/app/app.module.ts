import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BarcodeScannerLivestreamModule} from 'ngx-barcode-scanner';
import {FormsModule} from '@angular/forms';

import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, BarcodeScannerLivestreamModule, FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

