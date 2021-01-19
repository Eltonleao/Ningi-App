import { LoadingController } from '@ionic/angular';

import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { auth } from 'firebase/app';
import { NingiService } from "../services/ningi.service";
import { Storage } from '@ionic/storage';
import { Platform, NavController } from '@ionic/angular';

import { AppComponent } from '../app.component';

import { GooglePlus } from '@ionic-native/google-plus/ngx'



// export class User {
//   name: string;
// }

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // public user:User = new User();
  user: any;

  constructor(
    public fAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public ningiService: NingiService,
    public storage: Storage,
    private navCtrl: NavController,
    public loadingController: LoadingController,
    public app: AppComponent,
    public gplus: GooglePlus,
    public platform: Platform
  ) {

    console.log('entrando em login page...');

    this.user = {
      displayName: "User",
      photoURL: "https://picsum.photos/200"
    };

    this.storage.get('user').then((user) => {
      if (user) {
        this.user = user;
      }
    });
  }
  ngOnInit() {
  }



  async google() {
    var env = this;
    const loading = await this.loadingController.create({
      spinner: 'crescent',
    });
    await loading.present();

    if (this.platform.is('cordova')) {

      try {
        this.gplus.login({})
          .then(async res => {
            console.log(res);
            await loading.dismiss();
            await this.updateUserDataCordova(res);
          })
          .catch(err => console.error(err));
      } catch (error) {
        console.log(error);
      }

    } else {

      // var provider = new auth.GoogleAuthProvider();
      // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      // await this.fAuth.auth.signInWithPopup(provider);

      var provider = new auth.GoogleAuthProvider();
      const credential = await this.fAuth.auth.signInWithPopup(provider);
      // console.log(credential);
      env.user = await credential.user;
      await env.updateUserDataBrowser(credential.user);
      await loading.dismiss();


      // this.fAuth.auth.getRedirectResult().then(async function (user) {
      //   console.log("user que veio do signInWithRedirect", user);
      //   await loading.dismiss();
      //   await env.updateUserDataBrowser(user);
      // }).catch(function (error) {
      //   console.log(error);
      // });
    }


  }

  async updateUserDataCordova(user) {
    console.log('updating user...');
    var env = this;

    var data;
    if (!user.photoURL) {
      data = {
        uid: user.email,
        login_tipo: 'google',
        email: user.email,
        displayName: user.displayName,
        photoURL: user.imageUrl,
        deletado: 0
      }
    } else {
      data = {
        uid: user.email,
        login_tipo: 'google',
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        deletado: 0
      }
    }
    const loading = await this.loadingController.create({
      spinner: 'crescent',
    });
    await loading.present();

    await this.storage.set('user', data);
    await this.ningiService.updateUser(data).then(async data => {
      console.log("retorno de ningiService.updateUser: ", data);
      env.app.hideTabs = false;
      await loading.dismiss();
      this.navCtrl.navigateForward('/tabs/dashboard');

    });


  }


  async updateUserDataBrowser(user) {

    const data: any = {
      uid: user.email,
      login_tipo: 'google',
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      deletado: 0
    }
    const loading = await this.loadingController.create({
      spinner: 'crescent',
    });
    await loading.present();

    await this.storage.set('user', data);
    await this.ningiService.updateUser(data).then(async data => {
      this.navCtrl.navigateForward('/tabs/dashboard');
      await loading.dismiss();

    });


  }
}