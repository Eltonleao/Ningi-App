import { LoadingController } from '@ionic/angular';

import { Component, OnInit } from '@angular/core';
// import { NavController, NavParams } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {  AngularFirestore } from 'angularfire2/firestore';
import {  auth } from 'firebase/app';
import { NingiService } from "../services/ningi.service";
import { Storage } from '@ionic/storage';
import { Platform, NavController } from '@ionic/angular';



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
  user: any = null;

  constructor(
    public fAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public ningiService: NingiService,
    public storage: Storage,
    private navCtrl: NavController,
    public loadingController: LoadingController

  ) {

    // console.log('entrei aqui');
    this.storage.get('user').then((user) => {
      if(user){
        this.user = user;
      }
    })
  }
  ngOnInit() {
  }



  async google() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
    });
    // await loading.present();
    var provider = new auth.GoogleAuthProvider();
    const credential = await this.fAuth.auth.signInWithPopup(provider);
    // console.log(credential);
    this.user = await credential.user;
    await this.updateUserData(credential.user);
    await loading.dismiss();
  }

  async updateUserData(user) {

    const data: any = {
      uid: user.uid,
      login_tipo: 'google',
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    await this.storage.set('user', data );
    await window.location.reload();

    return this.ningiService.updateUser(data);

  }
}