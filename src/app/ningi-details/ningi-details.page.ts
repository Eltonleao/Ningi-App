import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NingiService } from "../services/ningi.service";
import { NavController } from "@ionic/angular";




@Component({
  selector: 'app-ningi-details',
  templateUrl: './ningi-details.page.html',
  styleUrls: ['./ningi-details.page.scss'],
})
export class NingiDetailsPage implements OnInit {

  ningi: any;
  data_criacao: any;
  data_modificacao: any;
  users = [];
  initCount = 0;
  user = {
    photoURL : ''
  };
  hasNingi: boolean;

  constructor(
    private route: ActivatedRoute,
    private ningiService: NingiService,
    private navCtrl: NavController,
    public storage: Storage,

  ) {
    var env = this;
    this.ningi = {};
    this.data_modificacao = '';
    this.users = [];

    this.storage.get('user').then((user)=>{
      console.log(user);
      env.user = user;
    })
  }

  async ngOnInit() {
    var env = this;
    var id = await this.route.snapshot.params['id'];
    // console.log(id);
    if (id) {
      env.ningiService.getNingi(id).then((data) => {
        // console.log(data.data_criacao);
        var formatedDateCriacao = env.ningiService.formatDate(data.data_criacao);
        env.data_criacao = formatedDateCriacao;

        if (data.data_modificacao) {
          var formatedDateModificacao = env.ningiService.formatDate(data.data_criacao);
          env.data_modificacao = formatedDateModificacao;
        }
        env.ningi = data;
        env.ningi.id = id;
        env.data_criacao = new Date(env.ningi.data_criacao);
        // env.data_criacao = env.data_criacao.toISOString();
        // console.log("%c data cricao: " + env.data_criacao, "background-color: blue");

      });
    } else {

      env.storage.get('user').then((user) => {
        console.log('getUser: ',user);
        if (user) {
          env.ningi.user = user.email;
          env.user = user;
          var d = new Date();
          var now = d.getTime();
          env.ningi = {
            deletado: 0,
            photoURL: user.photoURL,
            operation: 'incomming',
            source: 'carteira',
            user: user.email,
            data_criacao: now
          };
        }
      });
    }

    env.setUsers();
    
  }


  saveChenges() {
    var env = this;
    console.group();
    console.log(env.ningi.data_criacao, typeof env.ningi.data_criacao);
    
    if(!!Date.parse(env.ningi.data_criacao)){
      console.log('consegui converter pra date', Date.parse(env.ningi.data_criacao));
      env.ningi.data_criacao = Date.parse(env.ningi.data_criacao);
      console.log("resultado: ", env.ningi.data_criacao);
    } else{
      console.log('Não consegui converter pra date, deve ser um time', parseInt(env.ningi.data_criacao));
      env.ningi.data_criacao = parseInt(env.ningi.data_criacao);
      console.group(env.ningi.data_criacao);
    }
    console.log(env.ningi.data_criacao.data_criacao);
    console.groupEnd();
    
    
    if (env.ningi.id) {
      env.ningiService.updateNingi(env.ningi).then(() => {
        env.navCtrl.navigateForward('tabs/ningis');
      });
    } else {
      env.ningiService.addNingi(env.ningi).then((e) => {
        env.navCtrl.navigateForward('tabs/ningis');
      });
    }
  }

  setUsers() {
    var env = this;
    env.users = [];
    if (env.initCount == 0) {
      env.storage.get('user').then(async function (user) {
        env.users.push(user);
        await env.storage.get('partner').then(async (user) => {
          env.users.push(user);
        });
      });
    }

  }

  ionViewDidEnter() {
    this.ngOnInit();
  }
  
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
