import { stringify } from '@angular/compiler/src/util';

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { LoadingController, NavController } from "@ionic/angular";
import { Timestamp } from 'rxjs/internal/operators/timestamp';

import { Storage } from '@ionic/storage';
import { firestore } from 'firebase';


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
  public userRef: AngularFirestore;
  public userInfo: any;
  public checkUser;


  constructor(
    public db: AngularFirestore,
    public storage: Storage,
    public afs: AngularFirestore,
  ) {
    this.ningiCollection = db.collection<Ningi>('ningis', ref => ref.where("deletado", '==', 0));
    this.userCollection = db.collection('users', ref => ref.where("deletado", '==', 0));

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

  updateUser(user) {

    let userDoc = this.afs.firestore.collection(`users`).where('email', '==', user.email);
    console.log(userDoc);
    userDoc.get().then((querySnapshot) => {
      // console.log(querySnapshot.size)
      if (querySnapshot.size == 0) {
        console.log('usuariio novo, criando no banco...');
        this.storage.set('user', user);
        this.userCollection.add(user);
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
      mes: date.getMonth() + 1 < 10 ? "0" + stringify(date.getMonth() + 1) : date.getMonth(),
      dia: date.getDate() < 10 ? "0" + stringify(date.getDate()) : date.getDate(),
      hora: date.getHours() < 10 ? "0" + stringify(date.getHours()) : date.getHours(),
      min: date.getMinutes() < 10 ? "0" + stringify(date.getMinutes()) : date.getMinutes(),
      seg: date.getSeconds() < 10 ? "0" + stringify(date.getSeconds()) : date.getSeconds(),
    };

    return dc.dia + '/' + dc.mes + ' - ' + dc.hora + ':' + dc.min;

  }
}
