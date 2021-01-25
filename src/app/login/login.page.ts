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



  async googleLogin() {
    var env = this;
    var loading = await this.loadingController.create({
      spinner: 'crescent',
    });
    await loading.present();

    if (this.platform.is('cordova')) {
      await console.log('login mobile');


      try {
        this.gplus.login({})
          .then(async res => {
            await loading.dismiss();
            await this.updateUserDataCordova(res);
          })
          .catch(err => console.error(err));
      } catch (error) {
        console.log(error);
        var loading = await this.loadingController.create({
          message: error,
          spinner: 'crescent',
        });
        await loading.present();
        setTimeout(function () {
          loading.dismiss();
        }, 3000);
      }

    } else {

      var provider = new auth.GoogleAuthProvider();
      const credential = await this.fAuth.auth.signInWithPopup(provider);
      // console.log(credential);
      await env.updateUserDataBrowser(credential.user);
      await loading.dismiss();
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

    await this.ningiService.updateUser(data).then(async res => {
      if(res){
        await this.storage.set('user', data).then(async ()=>{
          this.app.showMenu = true;
          this.navCtrl.navigateRoot('tabs/dashboard');
          // window.location.href = '/tabs/dashboard';
        });
      } else{
        alert('Não foi possível cadastrar usuário');
      }

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