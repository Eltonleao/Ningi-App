import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from "../services/todo.service";
import { Ningi, NingiService } from "../services/ningi.service";


import { AlertController } from "@ionic/angular";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: 'app-ningis',
  templateUrl: './ningis.page.html',
  styleUrls: ['./ningis.page.scss'],
})
export class NingisPage implements OnInit {
  ningis: Ningi[];

  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public ningiService: NingiService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.ningiService.getNingis().subscribe(res => {
      this.ningis = res;
      console.log(this.ningis);
      this.ningis.map(x =>{
    
        x.data_criacao = new Date(x.data_criacao);
        
      })
    })
  }

  remove(ningi){
    this.ningiService.remove(ningi);
  }

}
