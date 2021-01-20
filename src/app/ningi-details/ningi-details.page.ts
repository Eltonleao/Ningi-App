import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NingiService } from "../services/ningi.service";
import { LoadingController, NavController } from "@ionic/angular";
import { runInThisContext } from 'vm';




@Component({
  selector: 'app-ningi-details',
  templateUrl: './ningi-details.page.html',
  styleUrls: ['./ningi-details.page.scss'],
})
export class NingiDetailsPage implements OnInit {

  ningi: any;
  data_criacao: any;
  data_modificacao: any;

  constructor(
    private route: ActivatedRoute,
    private ningiService: NingiService,
    private nav: NavController,
    public storage: Storage,

  ) {
    this.ningi = {};
    this.data_modificacao = '';
  }

  async ngOnInit() {
    var id = await  this.route.snapshot.params['id'];
    console.log(id);
    if (id) {
      this.ningiService.getNingi(id).then((data)=>{
        // console.log(data.data_criacao);
        var formatedDateCriacao = this.ningiService.formatDate(data.data_criacao);
        this.data_criacao = formatedDateCriacao;
        
        if(data.data_modificacao){
          var formatedDateModificacao = this.ningiService.formatDate(data.data_criacao);
          this.data_modificacao = formatedDateModificacao;
          console.log(this.data_modificacao);
        }
        this.ningi = data;
        this.ningi.id = id;

      });
    } else{
      this.storage.get('user').then((user)=>{
        if(user){
          this.ningi.user = user.email;
        }
      });
    }
  }


  saveChenges(){
    if(this.ningi.id){
      this.ningiService.updateNingi(this.ningi).then(()=>{
        window.location.href = '/tabs/ningis';
      });
    } else{
      this.ningiService.addNingi(this.ningi).then(()=>{
        // this.nav.back();
        window.location.href = '/tabs/ningis';
      });
    }
  }


}
