import { Component, OnInit} from '@angular/core';
// import { NavController, NavParams } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { auth } from 'firebase/app';
import { NingiService } from "../services/ningi.service";
import { Storage } from '@ionic/storage';


export class User {
    email: string;
    password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // public user:User = new User();
  constructor(
    public fAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public ningiService: NingiService,
    public storage: Storage
    ){
  }
  ngOnInit() {
    console.log('entrei aqui');
  }



  async google(){
    var provider = new auth.GoogleAuthProvider();
    const credential = await this.fAuth.auth.signInWithPopup(provider);
    // console.log(credential);
    return this.updateUserData(credential.user);
  }

  async signout(){
    await this.fAuth.auth.signOut(); 
  }

  async updateUserData(user){

    const data: any = {
      uid: user.uid,
      login_tipo: 'google',
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    var addUser = this.ningiService.updateUser(data);
    this.storage.set("user", data);
    console.log(addUser);

  }

  // async register() {
  //   try {
  //     var r = await this.fAuth.auth.createUserWithEmailAndPassword(
  //       this.user.email,
  //       this.user.password
  //     );
  //     if (r) {
  //       console.log("Successfully registered!");
  //     }

  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
}