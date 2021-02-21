// app.component.ts
import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { NingiService } from "./services/ningi.service";
import { NotificationsService } from "./services/notifications.service";
import { Storage } from '@ionic/storage';

import { MenuController } from '@ionic/angular';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

import { Insomnia } from '@ionic-native/insomnia/ngx';

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
  showMenu = false;
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
    public loadingController: LoadingController,
    public localNotifications: LocalNotifications,
    public notifications: NotificationsService,
    private insomnia: Insomnia
  ) {
    // this.storage.set('teste', 1);
    this.user = {
      displayName: "User",
      photoURL: "https://picsum.photos/100"
    };

    this.initializeApp();
  }

  initializeApp() {

    var env = this;
    this.platform.ready().then(() => {
      this.insomnia.keepAwake();
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#212121');
      this.splashScreen.hide();


      this.storage.get('user').then(function (user) {
        if (user) {
          // console.log('user logado');
          env.showMenu = true;
          env.hideTabs = false;
          env.loadUser();
          env.navCtrl.navigateForward('/tabs/ningi-details/GMuwG3WrdzIsTOe0A923');
        } else {
          console.log('user não logado');
          env.showMenu = false;
          env.navCtrl.navigateForward('/login');
        }
      })
    });
  }

  loadUser() {
    var env = this;
    this.storage.get('user').then(function (user) {
      env.user = user;
    });
  }

  async logout() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
    });
    await loading.present();

    await this.storage.set('user', null).then(async () => {
      await this.fAuth.auth.signOut().then(async () => {
        await loading.dismiss();
        await this.menu.close();
        this.showMenu = false;
        await this.navCtrl.navigateRoot('/login');
        // window.location.href = '/tabs/login';

      })
    })
  }

  goTo(page) {
    this.menu.close();
    this.navCtrl.navigateForward('tabs/' + page);

  }
}
