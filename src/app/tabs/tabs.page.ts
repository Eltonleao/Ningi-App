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
    this.user = null;
    this.hideTabs = app.hideTabs;

    storage.get('user').then((user)=>{
      this.user = user;
    })
  }

  
  goToNingis(){
    window.location.href = 'tabs/ningis';
  }


}
