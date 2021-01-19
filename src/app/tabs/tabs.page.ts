import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  user: any;
  hideTabs: any;
  constructor(
    public storage: Storage,
    public app: AppComponent,
  ) {
    this.hideTabs = app.hideTabs;

    this.storage.get('hideTabs').then((hide) => {
      if (hide) {
        this.hideTabs = hide;
      }
    })

    storage.get('user').then((user)=>{
      if(user){
        this.user = user;
      } else{
       this.user = false;
      }
    })
  }

  
  goToNingis(){
    window.location.href = 'tabs/ningis';
  }


}
