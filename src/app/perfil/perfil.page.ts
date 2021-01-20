import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from "@ionic/angular";
import { Ningi, NingiService } from "../services/ningi.service";
import { cordovaInstance } from '@ionic-native/core';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  user: any;
  myMagickWord: any;
  partner: any;
  constructor(
    public storage: Storage,
    public alertCtrl: AlertController,
    private ningiService: NingiService
  ) {
    this.user = {};
    this.myMagickWord = 'nenhuma palavra mágica encontrada...';
  }

  ngOnInit() {
    var env = this;
    this.storage.get('user').then((user) => {
      this.user = user;
      this.ningiService.getMyMagickWord().then(async data => {
        if (data) {
          env.myMagickWord = await data.magickword;
          await env.ningiService.getPartner(async function (partner) {
            env.ningiService.getuser(partner.partner_email, function(partner){
              console.log("partner", partner)
              env.partner = partner;
              env.storage.set('partner', partner);
            });
          });
        }
      })
    });

  }

  async updateMyMagickWord() {
    var alert = this.alertCtrl.create({
      message: "Magick Word Updated!"
    });
    await this.ningiService.updateMyMagickWord(this.myMagickWord).then(async () => {
      (await alert).present();
      setTimeout(async ()=>{
        (await alert).dismiss();
      }, 1000);
    });

  }

  async addPartner() {
    var env = this;
    const alert = await this.alertCtrl.create({
      message: "Insira a palavra mágica",
      inputs: [
        {
          name: 'magick_word',
          type: 'text',
          placeholder: 'Magick Word',
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
            if (data.magick_word != "") {
              await this.ningiService.checkMagickWord(data.magick_word).then(async data => {
                if (data) {
                  console.log("partner founded: ", data);

                  this.ningiService.addPartner(data, async function(){
                    var alert = env.alertCtrl.create({
                      message: "Partner Updated!"
                    });
                    (await alert).present();

                    setTimeout(async ()=>{
                      (await alert).dismiss();
                    }, 1000);
                    env.ngOnInit();
                  });
                } else {
                  var alert = env.alertCtrl.create({
                    message: "No user with that Magick Word has founded..."
                  });
                  (await alert).present();
                  setTimeout(async ()=>{
                    (await alert).dismiss();
                  }, 1000)
                }
              })
            } else {
              this.addPartner();
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async doRefresh(event){
    await this.ngOnInit();
    await event.target.complete();
  }

  ionViewDidEnter() {
    console.log("I'm alive!");
    this.ngOnInit();
  }

}
