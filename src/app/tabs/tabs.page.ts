import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  user: any;
  constructor(
    public storage: Storage

  ) {
    this.user = null;

    storage.get('user').then((user)=>{
      this.user = user;
    })
  }

}
