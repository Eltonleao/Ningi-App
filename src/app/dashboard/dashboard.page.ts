import { Storage } from '@ionic/storage';
import { Platform, NavController } from '@ionic/angular';

import { Todo, TodoService } from "../services/todo.service";
import { Ningi, NingiService } from "../services/ningi.service";

import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { LoadingController } from "@ionic/angular";
import {AppComponent} from '../app.component';


@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"],
})
export class DashboardPage implements OnInit {
  

  todos: Todo[];

  ningis: Ningi[];
  ningi: any;
  user: any;
  totalBalance: any = {
    value: 0,
    class: ''
  };

  totalCarteira: any = {
    value: 0,
    class: ''
  };

  totalBradesco: any = {
    value: 0,
    class: ''
  };

  totalBancoDoBrasil: any = {
    value: 0,
    class: ''
  };

  totalSantander: any = {
    value: 0,
    class: ''
  };



  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private todoService: TodoService,
    private ningiService: NingiService,
    public storage: Storage,
    public app: AppComponent,
    public navCtrl: NavController


  ) {
    const env = this;
    
    this.storage.get('user').then(function(user){
      console.log("user", user);
      if(!user){
        console.log('user não logado');
        env.navCtrl.navigateForward('/tabs/login');
        app.hideTabs = true;
        env.storage.set('hideTbas', true);
        window.location.href = '/tabs/login'; 
      } else{
        env.storage.set('hideTabs', false);
      }
    })

    this.ningiService.getTotalBalance(function (data) {
      data.subscribe((ningis) => {
        env.totalBalance.value = 0;
        ningis.forEach(ningi => {
          if (ningi.operation == 'incomming') {
            switch (ningi.source) {
              case "carteira":
                env.totalCarteira.value = env.totalCarteira.value + ningi.value
                break;
              case "santander":
                env.totalSantander.value = env.totalSantander.value + ningi.value
                break;
              case "bradesco":
                env.totalBradesco.value = env.totalBradesco.value + ningi.value
                break;
              case "banco_do_brasil":
                env.totalBancoDoBrasil.value = env.totalBancoDoBrasil.value + ningi.value
                break;
            }

            env.totalBalance.value = env.totalBalance.value + ningi.value
          } else {

            switch (ningi.source) {
              case "carteira":
                env.totalCarteira.value = env.totalCarteira.value - ningi.value
                break;
              case "santander":
                env.totalSantander.value = env.totalSantander.value - ningi.value
                break;
              case "bradesco":
                env.totalBradesco.value = env.totalBradesco.value - ningi.value
                break;
              case "banco_do_brasil":
                env.totalBancoDoBrasil.value = env.totalBancoDoBrasil.value - ningi.value
                break;
            }

            env.totalBalance.value = env.totalBalance.value - ningi.value
          }
        });
        if (env.totalBalance.value < 0) {
          env.totalBalance.color = 'danger';
        } else {
          env.totalBalance.color = 'success';
        }

        if (env.totalCarteira.value < 0) {
          env.totalCarteira.color = 'danger';
        } else {
          env.totalCarteira.color = 'success';
        }

        if (env.totalBradesco.value < 0) {
          env.totalBradesco.color = 'danger';
        } else {
          env.totalBradesco.color = 'success';
        }

        if (env.totalSantander.value < 0) {
          env.totalSantander.color = 'danger';
        } else {
          env.totalSantander.color = 'success';
        }

        if (env.totalBancoDoBrasil.value < 0) {
          env.totalBancoDoBrasil.color = 'danger';
        } else {
          env.totalBancoDoBrasil.color = 'success';
        }
      });
    });
  }

  ngOnInit() {
    this.todoService.getTodos().subscribe(res => {
      this.todos = res;
    });
    this.storage.get('user').then(user => {
      this.user = user;
    });

  }

  async addNingi(source) {

    console.log(source);
    var globalUser;
    this.storage.get('user').then((user)=>{
      globalUser = user;
    });
    const alert = await this.alertCtrl.create({
      cssClass: "my-custom-class",
      header: source,
      translucent: true,
      // subHeader: "Confirma operação?",
      message: "Digite o valor da operação",
      inputs: [
        {
          name: 'valor',
          type: 'number',
          placeholder: 'R$ 42,90',
          attributes: {
            autocomplete: 'false',
            required: true
          }
        }
      ],
      buttons: [
        {
          text: "Cancelar"
        },
        {
          text: "Ok",
          handler: async (data) => {
            if (data.valor != "") {
              this.ningi = {
                user: globalUser.email,
                value: parseFloat(data.valor),
                data_criacao: new Date().getTime(),
                source: source,
                deletado: 0,
                operation: "spend",
                photoURL: this.user.photoURL
              }
              this.saveNingi();
            } else {
              this.addNingi(source);
            }
          },
        },
      ],
    });
    await alert.present().then(() => {
      const firstInput: any = document.querySelector('ion-alert input');
      firstInput.focus();
      return;
    });
  }

  async saveNingi() {
    const loading = await this.loadingCtrl.create({
      message: "saving..."
    });
    await loading.present();
    await this.ningiService.addNingi(this.ningi).then((e) => {
      console.log(e);
    });
    loading.dismiss();
    const sucesso = await this.alertCtrl.create({
      message: "Saved!"
    });
    await sucesso.present();
    setTimeout(() => {
      sucesso.dismiss();
    }, 500)
  }
}
