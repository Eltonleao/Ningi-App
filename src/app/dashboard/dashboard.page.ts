import { Todo, TodoService } from "../services/todo.service";
import { Ningi, NingiService } from "../services/ningi.service";

import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { LoadingController } from "@ionic/angular";


@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"],
})
export class DashboardPage implements OnInit {

  todos: Todo[];

  ningis: Ningi[];
  ningi: any;


  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private todoService: TodoService,
    private ningiService: NingiService,

  ) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(res => {
      this.todos = res;
    });

    this.ningiService.getNingis().subscribe(res => {
      this.ningis = res;
      // console.log(this.ningis);
    });
    this.ningi = {};
  }

  async addNingi(source) {

    console.log(source);
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
            if(data.valor != ""){
              this.ningi = {
                user: 'elton',
                value: data.valor,
                data_criacao: new Date().getTime(),
                source: source,
                deletado : 0,
                operation: "spend"
              }
              this.saveNingi();
            } else{
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
    await this.ningiService.addNingi(this.ningi).then((e)=>{
      console.log(e);
    });
    loading.dismiss();
    const sucesso = await this.alertCtrl.create({
      message: "Saved!"
    });
    await sucesso.present();
    setTimeout(()=>{
      sucesso.dismiss();
    }, 1000)
  }
}
