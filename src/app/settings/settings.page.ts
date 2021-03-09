import { Component, OnInit } from '@angular/core';
import { NotificationsService } from "../services/notifications.service";
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  notificationHour: any;
  constructor(
    public notifications: NotificationsService,
    public storage: Storage,
  ) {
    this.storage.get('notification').then((time)=>{
      this.notificationHour = new Date(time).toISOString();
    })
  }

  ngOnInit() {
  }

  async setNotificationsTime($event){
    
    var notification = await new Date($event.detail.value).getTime();
    await this.storage.set('notification', notification).then( async ()=>{
      await this.notifications.setNotificationsTime();
    });

  }

}
