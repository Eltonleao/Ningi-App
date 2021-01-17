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
  constructor(
    public storage: Storage,
    public alertCtrl: AlertController,
    private ningiService: NingiService
  ) {
    this.user = {};
    this.myMagickWord = '';
  }

  ngOnInit() {

    this.storage.get('user').then((user)=>{
      this.user = user;
    });
    this.myMagickWord = this.ningiService.getMyMagickWord().then(data =>{
      if(data){
        this.myMagickWord = data.magickword;
      }
    })

  }

  async updateMyMagickWord(){
    await this.ningiService.updateMyMagickWord(this.myMagickWord);

  }

  async addPartner(){
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
            if(data.magick_word != ""){
              await this.ningiService.checkMagickWord(data.magick_word).then(data =>{
                if(data){
                  console.log("partner founded: ", data);

                  this.ningiService.addPartner(data);
                } else{
                  console.log('no partner');
                }
              })
            } else{
              this.addPartner();
            }
          },
        },
      ],
    });
    await alert.present();
  }

}
