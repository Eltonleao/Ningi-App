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
    this.storage.get('notifications').then((time)=>{
      this.notificationHour = time;
    })
  }

  ngOnInit() {
  }

  setNotificationsTime($event){

    var time = new Date($event.detail.value);
    var hour = time.getHours();
    var minute = time.getMinutes();
    
    this.notifications.setNotificationsTime(hour, minute);
  }

}
