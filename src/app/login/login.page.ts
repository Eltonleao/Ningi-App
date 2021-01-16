import { Component, OnInit} from '@angular/core';
// import { NavController, NavParams } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';

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

  public user:User = new User();
  constructor(public fAuth: AngularFireAuth){
  }
  ngOnInit() {
    console.log('entrei aqui');
  }



  async google(){
    var provider = new auth.GoogleAuthProvider();
    const credential = await this.fAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async updateUserData(user){
    // const userRef = Angular

  }

  async register() {
    try {
      var r = await this.fAuth.auth.createUserWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      if (r) {
        console.log("Successfully registered!");
      }

    } catch (err) {
      console.error(err);
    }
  }
}