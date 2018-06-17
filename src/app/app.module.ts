import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { FIREBASE_CONFIG } from './firebase.config';
import { Logic } from "../service/logic/logic.service";
import { LoginPage } from '../pages/login/login';
import { SetupPage } from '../pages/setup/setup';
import { AllmaidsPage } from '../pages/allmaids/allmaids';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SetupPage,
    AllmaidsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SetupPage,
    AllmaidsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Logic,
    FormsModule
  ]
})
export class AppModule {}
