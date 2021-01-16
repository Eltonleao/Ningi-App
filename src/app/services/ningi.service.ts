
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { LoadingController, NavController } from "@ionic/angular";
import { Timestamp } from 'rxjs/internal/operators/timestamp';

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
  public userRef: any;


  constructor(db: AngularFirestore) {
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
    )

    var docRef = db.collection("cities")

    docRef.get().subscribe((e)=>{
      return e;
    })

    // function (doc) {
    //   if (doc.exists) {
    //     console.log("Document data:", doc.data());
    //   } else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
    //   }
    // }).catch(function (error) {
    //   console.log("Error getting document:", error);
    // });
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

    // return this.userCollection.add(user);

  }
}
