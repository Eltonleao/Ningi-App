import { stringify } from '@angular/compiler/src/util';

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Observable, of } from 'rxjs';

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
  public ningis: Observable<Ningi[]>;
  public userCollection: any;
  public userMagickWordCollection: any;
  public userRef: AngularFirestore;
  public userInfo: any;
  public checkUser;
  public user;
  public partnerMagickWord;
  public userPartnerCollection;
  public partner;
  public tableNingis;
  constructor(
    public db: AngularFirestore,
    public storage: Storage,
    public afs: AngularFirestore,
  ) {
    this.tableNingis = 'ningis_homologacao';
    // this.tableNingis = 'ningis';
    this.loadCollections();
  }
  async ngOnInit() {
    this.getNingisSemanais();
    this.loadCollections();
  }

  loadCollections(): Promise<any> {
    var env = this;
    var db = this.db;
    return this.storage.get('user').then(async user => {
      if (!user) {
        return;
      } else {


        env.storage.get('partner').then(async (partner) => {
          // console.log("entrei aqui!", partner);
          env.user = await user;
          await env.getPartner();
          if (partner) {
            env.ningiCollection = db.collection<Ningi>(env.tableNingis, ref => ref.where("deletado", '==', 0).where('user', 'in', [user.email, partner.email]));
          } else {
            env.ningiCollection = db.collection<Ningi>(env.tableNingis, ref => ref.where("deletado", '==', 0).where('user', 'in', [user.email]));
          }
          env.ningis = this.ningiCollection.snapshotChanges().pipe(
            map(actions => {
              return actions.map(a => {
                // console.log(a);
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              });
            })
          );

          env.userCollection = db.collection('users', ref => ref.where("deletado", '==', 0));
          env.userMagickWordCollection = db.collection('user_magickword', ref => ref.where("deletado", '==', 0));
          env.userPartnerCollection = db.collection('user_partner', ref => ref.where("deletado", '==', 0));
        });
      }
    });

  }

  async getNingis(callback, limit = null) {
    this.partner = {
      partner_email: ''
    };
    await this.getPartner();
    var ningisArray = [];
    // console.log(this.partner);
    var env = this;
    env.storage.get('user').then(async (user) => {
      let ningis;
      if (limit) {
        ningis = env.afs.firestore.collection(env.tableNingis).where('user', 'in', [user.email, env.partner.partner_email]).where('deletado', '==', 0).orderBy('data_criacao', 'desc').limit(limit);
      } else {
        ningis = env.afs.firestore.collection(env.tableNingis).where('user', 'in', [user.email, env.partner.partner_email]).where('deletado', '==', 0).orderBy('data_criacao', 'desc');
      }
      await ningis.get().then(doc => {
        doc.forEach(element => {
          var data = element.data();
          data.fireID = element.id;
          ningisArray.push(data);
        });
      });
      await callback(ningisArray);
    });

  }


  async addNingi(ningi): Promise<any> {
    var env = this;
    var db = env.db;
    var ningiCollection = db.collection<Ningi>(env.tableNingis);
    return await ningiCollection.add(ningi);
  }

  async remove(ningi): Promise<any> {
    var env = this;
    var db = this.db;
    var ningiCollection;
    return this.storage.get('user').then(async user => {
      // console.log(user);
      // return 0;
      await env.storage.get('partner').then(async (partner) => {
        env.user = await user;
        await env.getPartner();
        if (partner) {
          ningiCollection = db.collection<Ningi>(env.tableNingis, ref => ref.where("deletado", '==', 0).where('user', 'in', [user.email, partner.email]));
        } else {
          ningiCollection = db.collection<Ningi>(env.tableNingis, ref => ref.where("deletado", '==', 0).where('user', 'in', [user.email]));
        }
        await ningiCollection.doc(ningi.fireID).update({ deletado: 1 }).then(async (data) => {
          document.getElementById(ningi.fireID).style.display = 'none';
        })
      });
    });
  }

  async updateUser(user): Promise<any> {
    console.log(user);
    var env = this;
    try {
      var userCollection = env.db.collection('users');
      return userCollection.doc(user.email).set(user).then(() => {
        return true;
      })
    } catch (error) {
      alert(error);
      return false;
    }
  }

  getNingi(id): Promise<any> {
    return this.db.collection(this.tableNingis).doc(id).ref.get().then(function (doc) {
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

  async updateNingi(ningi) {
    ningi.data_modificacao = new Date().getTime();
    var env = this;
    var db = this.db;
    return this.storage.get('user').then(async user => {
      if (!user) {
        return;
      } else {
        env.storage.get('partner').then(async (partner) => {
          // console.log("entrei aqui!", partner);
          env.user = await user;
          await env.getPartner();
          if (partner) {
            env.ningiCollection = db.collection<Ningi>(env.tableNingis, ref => ref.where("deletado", '==', 0).where('user', 'in', [user.email, partner.email]));
          } else {
            env.ningiCollection = db.collection<Ningi>(env.tableNingis, ref => ref.where("deletado", '==', 0).where('user', 'in', [user.email]));
          }
          return this.ningiCollection.doc(ningi.id).update(ningi);
        });
      }
    });
  }

  async checkMagickWord(magickWord): Promise<any> {
    var user;
    let user_magickword = this.afs.firestore.collection('user_magickword').where('magickword', '==', magickWord);
    await user_magickword.get().then(async doc => {
      doc.forEach(async element => {
        user = element.data();
      });
    });
    // await console.log(user);
    return user;
  }

  updateMyMagickWord(magickWord): Promise<any> {
    var env = this;
    var db = this.db;
    return this.storage.get('user').then((user) => {
      env.userMagickWordCollection = db.collection('user_magickword', ref => ref.where("deletado", '==', 0));
      this.userMagickWordCollection.doc(user.email).set({
        email: user.email,
        magickword: magickWord
      });
    });
  }

  getMyMagickWord() {
    return this.storage.get('user').then((user) => {
      try {
        return this.db.collection('user_magickword').doc(user.email).ref.get().then(function (doc) {
          return doc.data();
        });
      } catch (error) {
        return error;
      }
    });
  }

  async addPartner(partner, callback = null) {
    // console.log(user);
    // return;
    var env = this;
    var db = this.db;
    this.storage.get('user').then((mainUser) => {
      var userPartnerCollection = db.collection('user_partner', ref => ref.where("deletado", '==', 0));
      userPartnerCollection.doc(mainUser.email).set({
        user_email: mainUser.email,
        partner_email: partner.email,
        deletado: 0,
      }).then((doc) => {
        if (callback) {
          callback();
        }
      })

    })
  }

  async getPartner(callback = null) {
    var partner;

    await this.storage.get('user').then(async (user) => {
      if (user) {
        let user_partner = this.afs.firestore.collection('user_partner').where('user_email', '==', user.email);
        await user_partner.get().then(async doc => {
          doc.forEach(async element => {
            partner = element.data();

          });
        });

        if (partner) {
          this.partner = partner;
          if (callback) {
            callback(partner);
          }
        }
      }


    })
  }

  async getTotalBalance(callback) {
    await this.ngOnInit();
    if (callback) {
      await callback(this.ningis);
    }
  }

  async getuser(id, callback) {
    let user = this.afs.firestore.collection('users').doc(id);
    await user.get().then(async (data) => {
      if (callback) {
        callback(data.data());
      }
    });
  }

  async getNingisSemanais(): Promise<any> {
    var prevWeek = new Date();
    prevWeek.setDate(prevWeek.getDate() - 7);

    var prevWeekNingis = [];
    // console.log('entrei aqui 1');
    var env = this;
    await this.storage.get('user').then(async (user) => {
      var ningis = this.afs.firestore.collection(env.tableNingis).where('user', 'in', [user.email, this.partner.partner_email]).where('deletado', '==', 0).where('data_criacao', '>', prevWeek.getTime()).orderBy('data_criacao', 'desc');
      await ningis.get().then(doc => {
        doc.forEach(element => {
          var data = element.data();
          data.fireID = element.id;
          // console.log(data);
          prevWeekNingis.push(data);
        });
        // console.log('entrei aqui 2');
      });
    });
    return prevWeekNingis;
  }

  async getNingisSegment(operation = null, callback = null) {
    var now = new Date();
    now.setMonth(now.getMonth() - 1);
    var previousMonth = now.getTime();
    var env = this;
    var segment = [];
    await this.storage.get('user').then(async (user) => {
      if(!!operation){
        var ningis = this.afs.firestore.collection(env.tableNingis).where('user', 'in', [user.email, this.partner.partner_email]).where('deletado', '==', 0).where('data_criacao', '>', previousMonth).where('operation', '==', operation).orderBy('data_criacao', 'desc');
      } else{
        var ningis = this.afs.firestore.collection(env.tableNingis).where('user', 'in', [user.email, this.partner.partner_email]).where('deletado', '==', 0).where('data_criacao', '>', previousMonth).orderBy('data_criacao', 'desc');
      }
      await ningis.get().then(doc => {
        doc.forEach(element => {
          var data = element.data();
          data.fireID = element.id;
          data.data_criacao = env.formatDate(data.data_criacao);
          segment.push(data);
        });
      }).catch((error)=>{
        alert(error);
        return false;
      })
    });

    if (callback) {
      return callback(segment);
    }
  }

}
