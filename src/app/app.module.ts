import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterLink } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from "@angular/fire/compat";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBWh9ZePe049MhEDN_6iduhLMmmp3P5J4E',
  authDomain: 'pruebaapp-5ca51.firebaseapp.com',
  projectId: 'pruebaapp-5ca51',
  storageBucket: 'pruebaapp-5ca51.appspot.com',
  messagingSenderId: '966512395249',
  appId: '1:966512395249:web:64b9c22f38fa4ceb863a50',
  measurementId: 'G-PE1EB6GQ8Y',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterLink,
    provideFirebaseApp(() => initializeApp({"projectId":"pruebaapp-5ca51","appId":"1:966512395249:web:a9bfc2eeb502de44863a50","storageBucket":"pruebaapp-5ca51.appspot.com","apiKey":"AIzaSyBWh9ZePe049MhEDN_6iduhLMmmp3P5J4E","authDomain":"pruebaapp-5ca51.firebaseapp.com","messagingSenderId":"966512395249","measurementId":"G-8LMXQ0QN78"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
