import { TmplAstRecursiveVisitor } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  notificationHour: any;
  constructor(
    public localNotifications: LocalNotifications,
    public storage: Storage
  ) {
    this.init();
  }


  async init(){
  }


  async setNotificationsTime(hour, minute): Promise<any>{
    await this.localNotifications.schedule({
      id: 1,
      smallIcon: 'res://icon',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzfXKe6Yfjr6rCtR6cMPJB8CqMAYWECDtDqH-eMnerHHuXv9egrw',
      title: 'Oi, gastou dinheirinho hoje?',
      vibrate: false,
      trigger: {
        count: 1,
        every: {
          hour: hour,
          minute: minute
        }
      }
    });

    var date = new Date();
    date.setTime(0);
    date.setHours(hour);
    date.setMinutes(minute);
    this.storage.set('notifications', date).then(()=>{
      return true;
    });
  }

}
