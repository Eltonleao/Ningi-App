// app.component.ts
import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { NingiService } from "./services/ningi.service";
import { Storage } from '@ionic/storage';

import { MenuController } from '@ionic/angular'; 



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public loggedIn = false;
  currentPageTitle = 'Dashboard';
  user;
  teste: any = false;
  hideTabs;

  appPages = [
    {
      title: 'Dashboard',
      url: '',
      icon: 'easel'
    },
    {
      title: 'Timeline',
      url: '/timeline',
      icon: 'film'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'settings'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    public fAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public ningiService: NingiService,
    public storage: Storage,
    private menu: MenuController,
    public loadingController: LoadingController
  ) {
    this.user = null;
    this.initializeApp();
    this.hideTabs = false;
    console.log(this.user);
  }

  initializeApp() {
    var env = this;
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
      
      this.storage.get('user').then(function(user){
        if(user){
          env.user = user;
          env.navCtrl.navigateForward('tabs/ningis');
        } else{
          env.navCtrl.navigateForward('tabs/login');
          console.log('entrei aqui');
          env.hideTabs = true;
        }
      })
    });
  }

  async logout() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
    });
    await loading.present();

    await this.fAuth.auth.signOut();
    await this.storage.set('user', null);
    await window.location.reload();
    loading.dismiss();
    this.menu.close();

  }
}
