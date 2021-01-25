import { Storage } from '@ionic/storage';
import { Platform, NavController } from '@ionic/angular';


import { Todo, TodoService } from "../services/todo.service";
import { Ningi, NingiService } from "../services/ningi.service";

import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { LoadingController } from "@ionic/angular";
import { AppComponent } from '../app.component';

import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Color } from 'ng2-charts';






@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"],
})
export class DashboardPage implements OnInit {

  chartOptions = {
    responsive: true
  };
  chartData = [

  ];
  chartLabels = ['dom', 'seg', 'ter', 'qua', 'quin', 'sex', 'sab'];

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

  prevWeekNingis = {
    carteira: [],
    santander: [],
    bradesco: [],
    banco_do_brasil: []
  };



  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private ningiService: NingiService,
    public storage: Storage,
    public app: AppComponent,
    public navCtrl: NavController,
    private emailComposer: EmailComposer,
  ) {

    const env = this;

    this.storage.get('user').then(user => {
      if (!user) {
        env.navCtrl.navigateForward('/tabs/login');
        env.storage.set('hideTbas', true);
      } else{
        env.user = user;
      }
    });
  }

  ngOnInit() {
    this.getValores();
    this.loadCharts();
  }

  async addNingi(source) {

    // console.log(source);
    var globalUser;
    this.storage.get('user').then((user) => {
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
              await this.saveNingi();
              // await this.getValores();
              // await this.loadCharts();
              await this.ngOnInit();
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
    await this.ningiService.addNingi(this.ningi).then(async (e) => {
      loading.dismiss();
      const sucesso = await this.alertCtrl.create({
        message: "Saved!"
      });
      await sucesso.present();
      setTimeout(() => {
        sucesso.dismiss();
      }, 500)
    });
  }

  async doRefresh(event) {
    await this.ngOnInit();
    await event.target.complete();
  }

  goTo(href) {
    this.navCtrl.navigateForward(href);
  }

  ionViewDidEnter() {
    // console.log("I'm alive!");
    this.getValores();
    this.app.loadUser();
  }


  async getValores() {
    await this.zerarValore();
    var env = this;
    await this.ningiService.getNingis(async function (ningis) {
      // await console.log("data getToal:", ningis);
      // await data.subscribe((ningis) => {
      env.totalBalance.value = 0;
      env.totalCarteira.value = 0;
      env.totalSantander.value = 0;
      env.totalBradesco.value = 0;
      env.totalBancoDoBrasil.value = 0;
      ningis.forEach(ningi => {
        // console.log(typeof parseFloat(ningi.value));
        ningi.value = parseFloat(ningi.value)
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
      } else if (env.totalBalance.value == 0) {
        env.totalBalance.color = 'warning';
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
      // });
    });
  }
  zerarValore() {
    this.totalCarteira.value = 0;
    this.totalBradesco.value = 0;
    this.totalSantander.value = 0;
    this.totalBancoDoBrasil.value = 0;
  }

  copyObj(mainObj) {
    let objCopy = {}; // objCopy will store a copy of the mainObj
    let key;

    for (key in mainObj) {
      objCopy[key] = mainObj[key]; // copies each property to the objCopy object
    }
    return objCopy;
  }


  loadCharts() {
    const env = this;
    this.ningiService.getNingisSemanais().then(async (prevWeekNingis) => {
      // console.log(prevWeekNingis);
      var now = new Date(); now.setHours(0); now.setMinutes(0); now.setSeconds(0);
      // now.setDate(now.getDate() + 2);//n dias atras
      var diasDaSemana = ['dom', 'seg', 'ter', 'quar', 'quin', 'sex', 'sab'];
      diasDaSemana[now.getDay()] = 'hoje';

      var chartData = [];
      var chartLabels = [];

      var prevWeekDays = [];

      for (var i = 0; i <= 6; i++) {
        prevWeekDays.push({ weekday: now.getDay(), value: 0 });
        chartLabels.push(diasDaSemana[now.getDay()]);

        now.setDate(now.getDate() - 1);
      }
      // await console.log(prevWeekDays);
      prevWeekDays = await prevWeekDays.reverse();

      chartLabels = await chartLabels.reverse();
      // await console.log(prevWeekDays);
      this.chartLabels = await chartLabels;

      var carteira = JSON.parse(JSON.stringify(prevWeekDays));
      var bradesco = JSON.parse(JSON.stringify(prevWeekDays));
      var bancoDoBrasil = JSON.parse(JSON.stringify(prevWeekDays));
      var santander = JSON.parse(JSON.stringify(prevWeekDays));

      var ningis = await {
        carteira: carteira,
        bradesco: bradesco,
        santander: santander,
        banco_do_brasil: bancoDoBrasil
      };

      // await console.log(ningis);

      // return false;


      await prevWeekNingis.forEach(async ningi => {
        if (ningi.operation == 'spend') {
          var d = new Date(ningi.data_criacao);
          // console.log(d, ningis[ningi.source]);
          for (var item in ningis[ningi.source]) {
            // var index = ningis[ningi.source].findIndex((x) => x.weekday == d.getDay());
            if (ningis[ningi.source][item].weekday == d.getDay()) {
              // ningis[ningi.source][index]['value'] = await parseFloat(ningis[ningi.source][index]['value']) + parseFloat(ningi.value);
              // console.log(ningis[ningi.source][item]);
              ningis[ningi.source][item].value = parseFloat(ningis[ningi.source][item].value) + parseFloat(ningi.value);
            }
          }
          // console.log(ningis);
        }
      });

      // await console.log(ningis);


      for (var source in ningis) {
        var obj = { data: [], label: source };
        for (var index in ningis[source]) {
          obj.data.push(ningis[source][index].value);
        };
        chartData.push(obj);

        console.log(source);
        switch (source) {
          case 'carteira':
            obj['backgroundColor'] = '#2dd36f';
            obj['borderColor'] = '#2dd36f';
            obj['pointBackgroundColor'] = '#2dd36f';
            obj['pointBorderColor'] = '#2dd36f';
            obj['pointBorderColor'] = '#2dd36f';
            break;

          case 'bradesco':
            obj['backgroundColor'] = '#eb445a';
            obj['borderColor'] = '#eb445a';
            obj['pointBackgroundColor'] = '#eb445a';
            obj['pointBorderColor'] = '#eb445a';
            obj['pointBorderColor'] = '#eb445a';
            break;
          case 'santander':
            obj['backgroundColor'] = '#3880ff';
            obj['borderColor'] = '#3880ff';
            obj['pointBackgroundColor'] = '#3880ff';
            obj['pointBorderColor'] = '#3880ff';
            obj['pointBorderColor'] = '#3880ff';
            break;
          case 'banco_do_brasil':
            obj['backgroundColor'] = '#ffc409';
            obj['borderColor'] = '#ffc409';
            obj['pointBackgroundColor'] = '#ffc409';
            obj['pointBorderColor'] = '#ffc409';
            obj['pointBorderColor'] = '#ffc409';
            break;
        }
      }
      env.chartData = chartData;
      await console.log(env.chartData);
    });
  }
}
