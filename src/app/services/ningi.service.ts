import { stringify } from '@angular/compiler/src/util';

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { Storage } from '@ionic/storage';


export interface Ningi {
  user: number;
  value: number;
  source: string;
  data_criacao: any;
  deletado: 0;
}

@Injectable({
  providedIn: 'root'
})
export class NingiService {
  private ningiCollection: AngularFirestoreCollection<Ningi>;
  private ningis: Observable<Ningi[]>;
  public userCollection: any;
  public userMagickWordCollection: any;
  public userRef: AngularFirestore;
  public userInfo: any;
  public checkUser;
  public user;
  public partnerMagickWord;
  public userPartnerCollection;


  constructor(
    public db: AngularFirestore,
    public storage: Storage,
    public afs: AngularFirestore,
  ) {
    this.ningiCollection = db.collection<Ningi>('ningis', ref => ref.where("deletado", '==', 0));
    this.userCollection = db.collection('users', ref => ref.where("deletado", '==', 0));
    this.userMagickWordCollection = db.collection('user_magickword', ref => ref.where("deletado", '==', 0));
    this.userPartnerCollection = db.collection('user_partner', ref => ref.where("deletado", '==', 0));

    this.ningis = this.ningiCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          // console.log(a);
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    );

    this.storage.get('user').then(user =>{
      this.user = user;
    })

  }

  getNingis() {
    return this.ningis;
  }

  addNingi(ningi: Ningi) {
    // console.log(ningi);
    return this.ningiCollection.add(ningi);
  }

  remove(ningi) {
    console.log(ningi.id);
    this.ningiCollection.doc(ningi.id).update({ deletado: 1 });
  }

  async updateUser(user): Promise<any> {

    let userDoc = this.afs.firestore.collection(`users`).where('email', '==', user.email);
    // console.log(userDoc);
    return await userDoc.get().then( async (querySnapshot) => {
      // console.log(querySnapshot.size)
      if (querySnapshot.size == 0) {
        await console.log('usuario novo, criando no banco...');
        await this.storage.set('user', user);
        await console.log(user);
        await this.userCollection.doc(user.uid).set(user);
        return user;
      } else {
        console.log('usuario já existente, updating...');
        querySnapshot.forEach((doc) => {
          // console.log(doc.data());
          return this.storage.set('user', doc.data());
        })
      }
    })
  }

  getNingi(id): Promise<any> {
    return this.db.collection('ningis').doc(id).ref.get().then(function (doc) {
      if (doc.exists) {
        return doc.data();
      } else {
        console.log("There is no document!");
        return "There is no document!";
      }
    }).catch(function (error) {
      console.log("There was an error getting your document:", error);
      return error;
    });
  }


  formatDate(x) {

    var date = new Date(x);
    var dc = {
      ano: date.getFullYear() + 1 < 10 ? "0" + stringify(date.getFullYear() + 1) : date.getFullYear(),
      mes: date.getMonth() + 1 < 10 ? "0" + stringify(date.getMonth() + 1) : date.getMonth(),
      dia: date.getDate() < 10 ? "0" + stringify(date.getDate()) : date.getDate(),
      hora: date.getHours() < 10 ? "0" + stringify(date.getHours()) : date.getHours(),
      min: date.getMinutes() < 10 ? "0" + stringify(date.getMinutes()) : date.getMinutes(),
      seg: date.getSeconds() < 10 ? "0" + stringify(date.getSeconds()) : date.getSeconds(),
    };

    return dc.dia + '/' + dc.mes + '/' + dc.ano + ' - ' + dc.hora + ':' + dc.min;
  }

  updateNingi(ningi) {
    ningi.data_modificacao = new Date().getTime();
    return this.ningiCollection.doc(ningi.id).update(ningi);
  }

  async checkMagickWord(magickWord): Promise<any>{
    var user;
    let user_magickword = this.afs.firestore.collection('user_magickword').where('magickword', '==', magickWord);
    await user_magickword.get().then( async  doc =>{
      doc.forEach(async element => {
        user = element.data();
      });
    });
    // await console.log(user);
    return user;
  }

  updateMyMagickWord(magickWord){
    this.userMagickWordCollection.doc(this.user.uid).set({
      user_uid: this.user.uid,
      magickword: magickWord
    });
  }

  getMyMagickWord(){
    return this.db.collection('user_magickword').doc(this.user.uid).ref.get().then(function (doc) {
      return doc.data();
    });
  }

  async addPartner(user){
    // console.log(user);
    console.log(user);
    this.userPartnerCollection.doc(this.user.uid).set({
      user_uid: this.user.uid,
      partner_uid: user.user_uid,
      deletado : 0,
    });
  }

}
