
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { LoadingController, NavController } from "@ionic/angular";


export interface Ningi {
  user: number;
  value: number;
  source: string;
  data_criacao: string;
  deletado: 0;
}

@Injectable({
  providedIn: 'root'
})
export class NingiService {

  private ningiCollection: AngularFirestoreCollection<Ningi>;

  private ningis: Observable<Ningi[]>;


  constructor(db: AngularFirestore) {
    this.ningiCollection = db.collection<Ningi>('ningis', ref => ref.where("deletado", '==', 0));

    this.ningis = this.ningiCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          console.log(a);
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
  }

  getNingis() {
    // console.log(this.ningis);
    return this.ningis;
  }

  addNingi(ningi: Ningi) {
    // console.log(ningi);
    return this.ningiCollection.add(ningi);
  }
}
