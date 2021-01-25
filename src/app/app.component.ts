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
    public loadingController: LoadingController
  ) {
    // this.storage.set('teste', 1);
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
        if (user) {
          console.log('user logado');
          env.showMenu = true;
          env.hideTabs = false;
          env.loadUser();
          env.navCtrl.navigateForward('/tabs/dashboard');
        } else {
          console.log('user não logado');
          env.showMenu = false;
          env.navCtrl.navigateForward('/login');
        }
      })
    });
  }

  loadUser(){
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
      await this.fAuth.auth.signOut().then(async () =>{
        await loading.dismiss();
        await this.menu.close();
        this.showMenu = false;
        await this.navCtrl.navigateRoot('/login');
        // window.location.href = '/tabs/login';

      })
    })

  }
}
