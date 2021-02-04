import { Insomnia } from '@ionic-native/insomnia/ngx';
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
registerLocaleData(localePt)
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule} from '@angular/common/http';

// firebase imports, omit what you don't need for your app
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AngularFireAuthModule } from 'angularfire2/auth';

import { IonicStorageModule } from '@ionic/storage';
import { PopoverPage } from './popover/popover.page';

// environment
import { environment } from '../environments/environment';
import { GooglePlus } from '@ionic-native/google-plus/ngx';


//charts
import 'chartjs-plugin-zoom';
import {ChartsModule} from 'ng2-charts';

import 'moment';
import { MomentModule } from 'angular2-moment';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule, 
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
    ChartsModule,
    MomentModule
  ],
  providers: [
    GooglePlus,
    StatusBar,
    SplashScreen,
    PopoverPage,
    LocalNotifications,
    Insomnia,
    {
      provide: LOCALE_ID, 
      useValue: "pt-BR"
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {


}

