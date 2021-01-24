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
  user: any;
  teste: any = false;
  hideTabs;
  showMenu = true;

  // appPages = [
  //   {
  //     title: 'Dashboard',
  //     url: '',
  //     icon: 'easel'
  //   },
  //   {
  //     title: 'Timeline',
  //     url: '/timeline',
  //     icon: 'film'
  //   },
  //   {
  //     title: 'Settings',
  //     url: '/settings',
  //     icon: 'settings'
  //   }
  // ];

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
    this.user = {
      displayName: "User",
      photoURL: "https://picsum.photos/200"
    };

    this.initializeApp();
  }

  initializeApp() {

    var env = this;
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();


      this.storage.get('user').then(function (user) {
        console.log("user", user);
        if (user) {
          console.log('user logado');
          env.user = user;
          env.hideTabs = false;
          env.navCtrl.navigateForward('/tabs/dashboard');
        } else {
          console.log('user não logado');
          env.showMenu = false;
          env.navCtrl.navigateForward('/login');
        }
      })
    });
  }

  async logout() {
    console.log('logout...');
    const loading = await this.loadingController.create({
      spinner: 'crescent',
    });
    await loading.present();

    await this.storage.set('user', null).then(async () => {
      this.storage.set('hideTabs', true).then(async () => {
        await this.fAuth.auth.signOut();
        await loading.dismiss();
        await this.menu.close();
        // await this.navCtrl.navigateRoot('/tabs/login');
        window.location.href = '/tabs/login';

      })

    })

  }
}
